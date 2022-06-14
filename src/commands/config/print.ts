/**
 * Copyright 2022. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
import { flags } from '@oclif/command';
import { BaseCommand, chalk, ini } from '@tibco-software/cic-cli-core';

export default class ConfigList extends BaseCommand {
  static description = 'Print the configuration file';
  static examples = ['tibco config:print --local', 'tibco config:print --json', 'tibco config:print --global'];

  static flags = {
    ...BaseCommand.flags,
    local: flags.boolean({ char: 'l', description: 'Print local config', exclusive: ['global'] }),
    global: flags.boolean({ char: 'g', description: 'Print global config', exclusive: ['local'] }),
    json: flags.boolean({ char: 'j', description: 'To print in JSON format' }),
  };

  async run() {
    const { flags } = this.parse(ConfigList);
    let config = this.getPluginConfig();

    if (!flags.global) {
      if (flags.json) {
        this.log(JSON.stringify(config.localConfig));
      } else {
        let configIni = ini.stringify(config.localConfig, { whitespace: true });
        this.printIni(configIni, ' LOCAL CONFIG ');
      }
    }
    if (!flags.local) {
      if (flags.json) {
        this.log(JSON.stringify(config.globalConfig));
      } else {
        let configIni = ini.stringify(config.globalConfig, { whitespace: true });
        this.printIni(configIni, ' GLOBAL CONFIG ');
      }
    }
  }

  printIni(data: string, heading: string) {
    this.log('*'.repeat(25) + heading + '*'.repeat(25));

    const regexHeading = /\[[^\]\r\n]+]/gm;
    data = data.replaceAll(regexHeading, (val) => '[' + chalk.green(val.substring(1, val.length - 1)) + ']');

    const regexKeyValues = /(?:\r?\n(?:[^[\r\n].*))/gm;
    data = data.replaceAll(
      regexKeyValues,
      (val) => chalk.cyan(val.substring(0, val.indexOf('='))) + '=' + chalk.green(val.substring(val.indexOf('=') + 1))
    );

    // const regexOthers = /\=|\[|\]|"|\{|\}|\:/gm;
    // data = data.replaceAll(regexOthers, (val) => chalk.underline(val));

    this.log(data);
  }
}
