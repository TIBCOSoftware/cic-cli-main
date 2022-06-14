/**
 * Copyright 2022. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */

import { flags } from '@oclif/command';
import { CLIAuth } from '../../utils/auth';
import { region, Profile, TCBaseCommand, ux, ProfileConfig, secureStore, chalk } from '@tibco-software/cic-cli-core';
import { EventEmitter } from 'events';
import * as pEvent from 'p-event';
import { GenerateTokenResponse, RegisterClientResponse } from '../../models';
import * as CONFIG from '../../configs-for-config/config.json';

const DEFAULT_PROFILE = 'defaultProfile';
const CONFIG_VERSION = '1.0.0';
const allRegions = CONFIG.REGIONS;

const allScopes = CONFIG.SCOPES;

let auth: CLIAuth;
export default class ConfigInitialize extends TCBaseCommand {
  static description = 'Initialize CLI and create default profile';

  static aliases = ['profiles:init'];

  static flags = {
    ...TCBaseCommand.flags,
    profile: flags.string({ hidden: true }),
  };

  async run() {
    let event = new EventEmitter();

    let spinner = await ux.spinner();

    auth = new CLIAuth(this.id, this.getPluginName());

    spinner.start('Starting Local Server');
    let serverAddrs = await auth.startLocalServer(event);
    spinner.succeed('Listening on ' + serverAddrs);

    spinner.start('Registering client...');
    let clientDetails = await auth.registerClient(serverAddrs);
    spinner.succeed('Registered client');

    let region = await ux.promptChoices('Select region for default profile ', allRegions);

    let scope = await ux.promptMultiSelectChoices(
      'Domains that profile can access (Use space bar for selecting choices)',
      allScopes
    );

    let browserUrl = auth.getBrowserURL(scope, region, serverAddrs, clientDetails.client_id);

    spinner.start('Opening Browser for Authentication');
    await ux.open(browserUrl);

    let browserResponse = (await pEvent(event, 'onBrowserResponse', { multiArgs: true, timeout: 300000 }))[0];

    if (browserResponse.error) {
      spinner.stop();
      this.error(`${browserResponse.error}; ${browserResponse.error_description || ''}`);
    }

    spinner.succeed('Authenticated Successfully');
    spinner.start('Generating token...');
    let tokenInfo = await auth.generateToken(
      clientDetails.client_id,
      clientDetails.client_secret,
      serverAddrs,
      browserResponse.code,
      region
    );
    spinner.succeed('Token generated');

    spinner.start('Fetching org details');
    let org = await auth.getOrg(tokenInfo.access_token, region);
    spinner.succeed(`Chosen org or profile was ${org}`);

    spinner.start('Storing data...');
    this.storeConfigData(clientDetails, tokenInfo, region, org);
    spinner.succeed('Intialization completed successfully');
  }

  storeConfigData(clientInfo: RegisterClientResponse, tokenInfo: GenerateTokenResponse, region: region, org: string) {
    secureStore.saveClientSecret(clientInfo.client_secret);
    let config = new ProfileConfig(clientInfo.client_id, CONFIG_VERSION, DEFAULT_PROFILE, []);

    let profile: Profile = {
      name: DEFAULT_PROFILE,
      region: region,
      org: org,
    };

    let atExp = new Date().getTime() + tokenInfo.expires_in * 1000;
    let rtExp = new Date().getTime() + tokenInfo.refresh_token_expires_in * 1000;
    config.addProfile(profile, {
      accessToken: tokenInfo.access_token,
      refreshToken: tokenInfo.refresh_token,
      accessTokenExp: atExp,
      refreshTokenExp: rtExp,
    });

    this.saveProfileConfig(config);
  }

  async finally(err: Error) {
    this.log('Shutting down local server');
    auth.stopLocalServer();
    return super.finally(err);
  }

  getPluginName() {
    if (this.id) {
      return this.config.findCommand(this.id)?.pluginName;
    }
  }
}
