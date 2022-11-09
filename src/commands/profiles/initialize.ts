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
  static description = 'Initialize the CLI and create your default profile';

  static aliases = ['profiles:init'];

  static flags = {
    ...TCBaseCommand.flags,
    profile: flags.string({ hidden: true }),
  };

  async run() {
    let event = new EventEmitter();

    let spinner = await ux.spinner();

    auth = new CLIAuth(this.id, this.getPluginName());

    spinner.start('Starting the local Server');
    let serverAddrs = await auth.startLocalServer(event);
    spinner.succeed('Listening on ' + serverAddrs);

    spinner.start('Registering client...');
    let clientDetails = await auth.registerClient(serverAddrs);
    spinner.succeed('Client registered');

    let region = await ux.promptChoices('Select a region for the default profile', allRegions);

    let scope = await ux.promptMultiSelectChoices(
      'Select domains the profile can access. (Use the spacebar to select)',
      allScopes
    );

    let browserUrl = auth.getBrowserURL(scope, region, serverAddrs, clientDetails.client_id);

    spinner.start('Opening browser for authentication');
    await ux.open(browserUrl);

    let browserResponse = (await pEvent(event, 'onBrowserResponse', { multiArgs: true, timeout: 300000 }))[0];

    if (browserResponse.error) {
      spinner.stop();
      this.error(`${browserResponse.error}; ${browserResponse.error_description || ''}`);
    }

    spinner.succeed('Authenticated successfully');
    spinner.start('Generating token...');
    let tokenInfo = await auth.generateToken(
      clientDetails.client_id,
      clientDetails.client_secret,
      serverAddrs,
      browserResponse.code,
      region
    );
    spinner.succeed('Token generated');

    spinner.start('Fetching organization details');
    let org = await auth.getOrg(tokenInfo.access_token, region);
    spinner.succeed(`Selected organization is ${org}`);

    spinner.start('Storing data...');
    this.storeConfigData(clientDetails, tokenInfo, region, org);
    spinner.succeed('Initialization completed successfully');
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
    this.log('Shutting down the local server');
    auth.stopLocalServer();
    return super.finally(err);
  }

  getPluginName() {
    if (this.id) {
      return this.config.findCommand(this.id)?.pluginName;
    }
  }
}
