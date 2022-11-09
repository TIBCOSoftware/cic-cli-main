/**
 * Copyright 2022. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
import { flags } from '@oclif/command';
import { BaseCommand, chalk } from '@tibco-software/cic-cli-core';

export default class ConfigGet extends BaseCommand {
  static description = 'Get the property value from the configuration file';
  static examples = ['tibco config:get tci.flogo.app-id'];
  static flags = {
    ...BaseCommand.flags,
    local: flags.boolean({ char: 'l', description: 'local config', exclusive: ['global'] }),
    global: flags.boolean({ char: 'g', description: 'global config', exclusive: ['local'] }),
  };

  static args = [{ name: 'property', required: true, description: 'Property name' }];

  async run() {
    const { args, flags } = this.parse(ConfigGet);
    let confLocn: 'local' | 'global' | undefined;

    if (flags.local) {
      confLocn = 'local';
    } else if (flags.global) {
      confLocn = 'global';
    }

    let config = this.getPluginConfig();
    let val = config.get(args.property, { absolutePath: true, source: confLocn });

    if (val === undefined) {
      this.log('No such property found');
      this.exit(1);
    } else {
      if (typeof val === 'object') {
        this.log(JSON.stringify(val));
        return;
      }
      this.log(val);
    }
  }

  pretty(property: string, val: any) {
    if (typeof val === 'object') {
      this.log(JSON.stringify(val, null, ' '));
      return;
    }
    let absolutePath = property.split('.');
    property = absolutePath[absolutePath.length - 1];
    let totalHeadingSpaces = 2;
    if (property.length > 'PROPERTY'.length) {
      totalHeadingSpaces += property.length - 'PROPERTY'.length;
    }
    let heading = 'PROPERTY' + ' '.repeat(totalHeadingSpaces) + 'VALUE';
    let prettyHeading =
      chalk.green(chalk.underline('PROPERTY')) + ' '.repeat(totalHeadingSpaces) + chalk.green(chalk.underline('VALUE'));
    this.log(prettyHeading);
    let valueStartPos = heading.indexOf('VALUE') - property.length;
    let row = property + ' '.repeat(valueStartPos) + val;
    this.log(row);
  }
}
