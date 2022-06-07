`tibco plugins`
===============

Manage plugins of TIBCO Cloud CLI

* [`tibco plugins`](#tibco-plugins)
* [`tibco plugins:inspect PLUGIN...`](#tibco-pluginsinspect-plugin)
* [`tibco plugins:install PLUGIN...`](#tibco-pluginsinstall-plugin)
* [`tibco plugins:link PLUGIN`](#tibco-pluginslink-plugin)
* [`tibco plugins:uninstall PLUGIN...`](#tibco-pluginsuninstall-plugin)
* [`tibco plugins:update`](#tibco-pluginsupdate)

## `tibco plugins`

list installed plugins

```
USAGE
  $ tibco plugins

OPTIONS
  --core  show core plugins

EXAMPLE
  $ tibco plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.10.11/src/commands/plugins/index.ts)_

## `tibco plugins:inspect PLUGIN...`

displays installation properties of a plugin

```
USAGE
  $ tibco plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] plugin to inspect

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

EXAMPLE
  $ tibco plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.10.11/src/commands/plugins/inspect.ts)_

## `tibco plugins:install PLUGIN...`

installs a plugin into the CLI

```
USAGE
  $ tibco plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  plugin to install

OPTIONS
  -f, --force    yarn install with force flag
  -h, --help     show CLI help
  -v, --verbose

DESCRIPTION
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command 
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in 
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ tibco plugins:add

EXAMPLES
  $ tibco plugins:install myplugin 
  $ tibco plugins:install https://github.com/someuser/someplugin
  $ tibco plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.10.11/src/commands/plugins/install.ts)_

## `tibco plugins:link PLUGIN`

links a plugin into the CLI for development

```
USAGE
  $ tibco plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

DESCRIPTION
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
   command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLE
  $ tibco plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.10.11/src/commands/plugins/link.ts)_

## `tibco plugins:uninstall PLUGIN...`

removes a plugin from the CLI

```
USAGE
  $ tibco plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

ALIASES
  $ tibco plugins:unlink
  $ tibco plugins:remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.10.11/src/commands/plugins/uninstall.ts)_

## `tibco plugins:update`

update installed plugins

```
USAGE
  $ tibco plugins:update

OPTIONS
  -h, --help     show CLI help
  -v, --verbose
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.10.11/src/commands/plugins/update.ts)_
