/**
 * Copyright 2022. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */

import { flags } from '@oclif/command';
import { Profile, ux, secureStore, chalk, TCBaseCommand } from '@tibco-software/cic-cli-core';
import { CLIAuth } from '../../utils/auth';
import { EventEmitter } from 'events';
import pEvent = require('p-event');
import * as CONFIG from '../../configs-for-config/config.json';

let auth: CLIAuth;

const allRegions = CONFIG.REGIONS;
const allScopes = CONFIG.SCOPES;

export default class ConfigAddProfile extends TCBaseCommand {
  static description = `Add profiles to your configuration`;

  static flags = {
    ...TCBaseCommand.flags,
    profile: flags.string({ hidden: true }),
  };

  async run() {
    auth = new CLIAuth(this.id, this.getPluginName());

    let name = await ux.prompt('Profile name', 'input');

    let spinner = await ux.spinner();

    let event = new EventEmitter();

    spinner.start('Starting the local Server');
    let serverAddrs = await auth.startLocalServer(event);
    spinner.succeed('Listening on ' + serverAddrs);

    let config = this.getProfileConfig();

    let region = await ux.promptChoices('Select a region for the default profile', allRegions);

    let scope = await ux.promptMultiSelectChoices(
      'Select domains the profile can access. (Use the spacebar to select)',
      allScopes
    );

    let browserUrl = auth.getBrowserURL(scope, region, serverAddrs, config.clientID);

    spinner.start('Opening Browser for authentication');
    await ux.open(browserUrl);

    let browserResponse = (await pEvent(event, 'onBrowserResponse', { multiArgs: true, timeout: 300000 }))[0];

    if (browserResponse.error) {
      this.error(`${browserResponse.error}; ${browserResponse.error_description || ''}`);
    }
    spinner.succeed('Authenticated successfully');
    spinner.start('Generating token...');
    let cs = await secureStore.getClientSecret();
    if (cs == null) {
      this.error(`Client secret couldn't be found`);
    }
    let tokenInfo = await auth.generateToken(config.clientID, cs, serverAddrs, browserResponse.code, region);
    spinner.succeed('Token generated');

    spinner.start('Fetching organization details');
    let org = await auth.getOrg(tokenInfo.access_token, region);
    spinner.succeed(`Selected organization is ${org}`);

    let profile: Profile = {
      name: name,
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

    spinner.succeed('Profile added successfully');
  }

  async finally() {
    this.log('Shutting down the local server');
    auth.stopLocalServer();
  }

  getPluginName() {
    if (this.id) {
      return this.config.findCommand(this.id)?.pluginName;
    }
  }
}
