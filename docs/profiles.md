`tibco profiles`
================

Manage profiles of the CLI to interact with the TIBCO Cloud

* [`tibco profiles:add`](#tibco-profilesadd)
* [`tibco profiles:initialize`](#tibco-profilesinitialize)
* [`tibco profiles:list`](#tibco-profileslist)
* [`tibco profiles:refresh-token`](#tibco-profilesrefresh-token)
* [`tibco profiles:remove [NAME]`](#tibco-profilesremove-name)
* [`tibco profiles:set-default [NAME]`](#tibco-profilesset-default-name)

## `tibco profiles:add`

Add profiles to the configuration

```
USAGE
  $ tibco profiles:add

OPTIONS
  --config=config  Path to the local config file
  --no-warnings    Disable warnings from command's output
```

_See code: [src/commands/profiles/add.ts](https://github.com/TIBCOSoftware/cic-cli-main/blob/v1.0.0/src/commands/profiles/add.ts)_

## `tibco profiles:initialize`

Initialize CLI and create default profile

```
USAGE
  $ tibco profiles:initialize

OPTIONS
  --config=config  Path to the local config file
  --no-warnings    Disable warnings from command's output

ALIASES
  $ tibco profiles:init
```

_See code: [src/commands/profiles/initialize.ts](https://github.com/TIBCOSoftware/cic-cli-main/blob/v1.0.0/src/commands/profiles/initialize.ts)_

## `tibco profiles:list`

List all configured profiles

```
USAGE
  $ tibco profiles:list

OPTIONS
  --config=config  Path to the local config file
  --no-warnings    Disable warnings from command's output
```

_See code: [src/commands/profiles/list.ts](https://github.com/TIBCOSoftware/cic-cli-main/blob/v1.0.0/src/commands/profiles/list.ts)_

## `tibco profiles:refresh-token`

Refresh a token for a profile

```
USAGE
  $ tibco profiles:refresh-token

OPTIONS
  --config=config    Path to the local config file
  --no-warnings      Disable warnings from command's output
  --profile=profile  Switch to different org or region using profile
```

_See code: [src/commands/profiles/refresh-token.ts](https://github.com/TIBCOSoftware/cic-cli-main/blob/v1.0.0/src/commands/profiles/refresh-token.ts)_

## `tibco profiles:remove [NAME]`

Remove profiles from configuration

```
USAGE
  $ tibco profiles:remove [NAME]

ARGUMENTS
  NAME  Name of the profile to be removed

OPTIONS
  --config=config  Path to the local config file
  --no-warnings    Disable warnings from command's output
```

_See code: [src/commands/profiles/remove.ts](https://github.com/TIBCOSoftware/cic-cli-main/blob/v1.0.0/src/commands/profiles/remove.ts)_

## `tibco profiles:set-default [NAME]`

Change the default profile

```
USAGE
  $ tibco profiles:set-default [NAME]

ARGUMENTS
  NAME  Profile name

OPTIONS
  --config=config  Path to the local config file
  --no-warnings    Disable warnings from command's output
```

_See code: [src/commands/profiles/set-default.ts](https://github.com/TIBCOSoftware/cic-cli-main/blob/v1.0.0/src/commands/profiles/set-default.ts)_
