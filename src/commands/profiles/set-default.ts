/**
 * Copyright 2022. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */

import { flags } from '@oclif/command';
import { TCBaseCommand, ux } from '@tibco-software/cic-cli-core';

export default class ConfigSetDefaultProfile extends TCBaseCommand {
  static description = 'Change the default profile';

  static aliases = ['profiles:use'];

  static flags = {
    ...TCBaseCommand.flags,
    profile: flags.string({ hidden: true }),
  };

  static args = [{ name: 'name', description: 'Profile name' }];

  async run() {
    const { args } = this.parse(ConfigSetDefaultProfile);
    let config = this.getProfileConfig();
    let name = await ux.prompt('Name for the profile', 'input', args.name);
    let profile = config.getProfileByName(name);
    if (!profile) {
      this.log(`Profile ${name} does not exist`);
      this.exit();
    }
    config.defaultProfile = name;
    this.saveProfileConfig(config);
    this.log(`Default profile set to ${name}`);
  }
}
