/**
 * Copyright 2022. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
import { flags } from '@oclif/command';
import { BaseCommand, ux } from '@tibco-software/cic-cli-core';

export default class ConfigUnset extends BaseCommand {
  static description = 'Delete a property in the configuration file';
  static examples = ['tibco config:unset tci.flogo.server --local --yes'];

  static flags = {
    ...BaseCommand.flags,
    local: flags.boolean({ char: 'l', description: 'Local config', exclusive: ['global'] }),
    global: flags.boolean({ char: 'g', description: 'Global config', exclusive: ['local'] }),
    confirm: flags.boolean({ char: 'y', description: 'Confirmation to delete the property' }),
  };

  static args = [{ name: 'property', required: true, description: 'Property name' }];

  async run() {
    const { args, flags } = this.parse(ConfigUnset);

    if (!flags.confirm) {
      let ans = await ux.promptChoices(`Do you want to delete the property ${args.property}?`, ['yes', 'no']);
      if (ans == 'no') return;
    }

    let confLocn: any;

    if (flags.local === true) {
      confLocn = 'local';
    } else if (flags.global === true) {
      confLocn = 'global';
    } else {
      confLocn = await ux.promptChoices('Where to unset this property?', ['local', 'global']);
    }

    this.getPluginConfig().delete(args.property, { absolutePath: true, source: confLocn });
  }
}
