/**
 * Copyright 2022. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */

import { TCBaseCommand } from '@tibco-software/cic-cli-core';

export default class ConfigRefreshToken extends TCBaseCommand {
  static description = 'Refresh a token for a profile';

  static flags = {
    ...TCBaseCommand.flags,
  };

  async run() {
    const { flags } = this.parse(ConfigRefreshToken);

    let config = this.getProfileConfig();
    let profile = config.getProfileByName(flags.profile);

    if (!profile) {
      this.error(`Profile ${flags.profile} not found`);
    }

    this.log('Token will be refreshed only if it is expired');
    let req = this.getTCRequest();
    if (await req.getValidToken()) {
      this.log('Token refreshed sucessfully');
    }
  }

  getPluginName() {
    if (this.id) {
      return this.config.findCommand(this.id)?.pluginName;
    }
  }
}
