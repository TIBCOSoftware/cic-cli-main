/**
 * Copyright 2022. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */

import { flags } from '@oclif/command';
import { TCBaseCommand, ux } from '@tibco-software/cic-cli-core';

export default class ConfigRemoveProfile extends TCBaseCommand {
  static description = 'Remove profiles from the configuration';

  static aliases = ['profiles:rm'];

  static flags = {
    ...TCBaseCommand.flags,
    profile: flags.string({ hidden: true }),
  };

  static args = [{ name: 'name', description: 'Name of the profile to remove' }];

  async run() {
    const { args, flags } = this.parse(ConfigRemoveProfile);

    if (args.name === '-h') {
      this._help();
    }

    let name = await ux.prompt('Profile name', 'input', args.name);
    let config = this.getProfileConfig();

    await config.removeProfile(name);
    this.saveProfileConfig(config);
    this.log('Profile removed successfully');
  }
}
