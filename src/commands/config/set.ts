/**
 * Copyright 2022. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
import { flags } from '@oclif/command';
import { BaseCommand, ux } from '@tibco-software/cic-cli-core';

export default class ConfigSet extends BaseCommand {
  static description = 'Update or insert a property in the configuration file';
  static examples = ['tibco config:set tci.flogo.trigger kafka --local'];

  static flags = {
    ...BaseCommand.flags,
    local: flags.boolean({ char: 'l', description: 'local config', exclusive: ['global'] }),
    global: flags.boolean({ char: 'g', description: 'global config', exclusive: ['local'] }),
  };

  static args = [
    { name: 'property', required: true, description: 'Property Name' },
    { name: 'value', required: true, description: 'Value of the property' },
  ];

  async run() {
    const { args, flags } = this.parse(ConfigSet);
    let confLocn: any;

    if (flags.local === true) {
      confLocn = 'local';
    } else if (flags.global === true) {
      confLocn = 'global';
    } else {
      confLocn = await ux.promptChoices('Where to set this property?', ['local', 'global']);
    }

    this.getPluginConfig().set(args.property, args.value, { absolutePath: true, source: confLocn });
  }
}
