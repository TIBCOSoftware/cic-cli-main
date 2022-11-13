/**
 * Copyright 2022. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */

import { flags } from '@oclif/command';
import { ProfileConfig, ProfileConfigManager, secureStore, TCBaseCommand, ux } from '@tibco-software/cic-cli-core';

import * as fs from 'fs';

export default class CleanAll extends TCBaseCommand {
  static description = 'Remove all profiles, configurations, CLI plugins and cache data';

  static flags = {
    ...TCBaseCommand.flags,
    confirm: flags.boolean({
      char: 'c',
      description: 'Confirm that you want to remove all of your profiles, plugins and cache data',
    }),
  };

  async run() {
    let { flags } = this.parse(CleanAll);
    this.log('Cleaning will remove all of your profiles, plugins and cache data.');

    if (!flags.confirm) {
      let ans = await ux.promptChoices('Do you still want to continue the cleaning process?', ['yes', 'no']);

      if (ans == 'no' || ans == 'false') {
        this.log('Terminated the cleaning process.');
        return;
      }
    }
    this.debug(`Removing all the CLI profiles`);
    this.cleanProfilesConf().catch((e) => this.error(e));

    if (fs.existsSync(this.config.cacheDir)) {
      this.log(`Cleaning cache directory located at ${this.config.cacheDir}`);
      fs.rmSync(this.config.cacheDir, { recursive: true });
    }

    if (fs.existsSync(this.config.configDir)) {
      this.log(`Cleaning configuration directory located at ${this.config.configDir}`);
      fs.rmSync(this.config.configDir, { recursive: true });
    }

    if (fs.existsSync(this.config.dataDir)) {
      this.log(`Cleaning data directory located at ${this.config.configDir}`);
      fs.rmSync(this.config.dataDir, { recursive: true });
    }
  }

  async cleanProfilesConf() {
    let profileCfg: ProfileConfig;
    let arr: any = [];
    let configMgr = new ProfileConfigManager(this.config.configDir);
    try {
      profileCfg = configMgr.getConfig();
    } catch (e) {
      return; // if profile config file is not present then just return
    }

    await secureStore.removeClientSecret();
    profileCfg.defaultProfile = '';

    profileCfg.profiles.forEach((profile) => arr.push(profileCfg.removeProfile(profile.name)));

    return Promise.all(arr);
  }
}
