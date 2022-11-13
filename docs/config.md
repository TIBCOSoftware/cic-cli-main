`tibco config`
==============

Manage CLI config properties

* [`tibco config:get PROPERTY`](#tibco-configget-property)
* [`tibco config:print`](#tibco-configprint)
* [`tibco config:set PROPERTY VALUE`](#tibco-configset-property-value)
* [`tibco config:unset PROPERTY`](#tibco-configunset-property)

## `tibco config:get PROPERTY`

Get the property value from the configuration file

```
USAGE
  $ tibco config:get PROPERTY

ARGUMENTS
  PROPERTY  Property name

OPTIONS
  -g, --global     global config
  -l, --local      local config
  --config=config  Path to the local config file
  --no-warnings    Disable warnings from command's output

EXAMPLE
  tibco config:get tci.flogo.app-id
```

_See code: [src/commands/config/get.ts](https://github.com/TIBCOSoftware/cic-cli-main/blob/v1.1.0/src/commands/config/get.ts)_

## `tibco config:print`

Print the configuration file

```
USAGE
  $ tibco config:print

OPTIONS
  -g, --global     Print global config
  -j, --json       Print in JSON format
  -l, --local      Print local config
  --config=config  Path to the local config file
  --no-warnings    Disable warnings from command's output

EXAMPLES
  tibco config:print --local
  tibco config:print --json
  tibco config:print --global
```

_See code: [src/commands/config/print.ts](https://github.com/TIBCOSoftware/cic-cli-main/blob/v1.1.0/src/commands/config/print.ts)_

## `tibco config:set PROPERTY VALUE`

Insert or update a property in the configuration file

```
USAGE
  $ tibco config:set PROPERTY VALUE

ARGUMENTS
  PROPERTY  Property name
  VALUE     Value of the property

OPTIONS
  -g, --global     Global config
  -l, --local      Local config
  --config=config  Path to the local config file
  --no-warnings    Disable warnings from command's output

EXAMPLE
  tibco config:set tci.flogo.trigger kafka --local
```

_See code: [src/commands/config/set.ts](https://github.com/TIBCOSoftware/cic-cli-main/blob/v1.1.0/src/commands/config/set.ts)_

## `tibco config:unset PROPERTY`

Delete a property in the configuration file

```
USAGE
  $ tibco config:unset PROPERTY

ARGUMENTS
  PROPERTY  Property name

OPTIONS
  -g, --global     Global config
  -l, --local      Local config
  -y, --confirm    Confirmation to delete the property
  --config=config  Path to the local config file
  --no-warnings    Disable warnings from command's output

EXAMPLE
  tibco config:unset tci.flogo.server --local --yes
```

_See code: [src/commands/config/unset.ts](https://github.com/TIBCOSoftware/cic-cli-main/blob/v1.1.0/src/commands/config/unset.ts)_
