/**
 * Copyright 2022. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */

import { flags } from '@oclif/command';
import { TCBaseCommand, ux } from '@tibco-software/cic-cli-core';

export default class ConfigProfiles extends TCBaseCommand {
  static description = 'List all configured profiles';

  static flags = {
    ...TCBaseCommand.flags,
    profile: flags.string({ hidden: true }),
  };

  static aliases = ['profiles:ls'];

  async run() {
    let config = this.getProfileConfig();
    let displayProfiles: any[] = [];
    config.profiles.forEach((p) => {
      let temp: any = p;
      temp.default = (config.defaultProfile === p.name).toString();
      displayProfiles.push(temp);
    });

    ux.showTable(displayProfiles, 'Profiles');
  }
}
