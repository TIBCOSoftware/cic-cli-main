`tibco profiles`
================

Add profiles to the configuration

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
  --no-warnings  Disable warnings from commands outputs
```

_See code: [src/commands/profiles/add.ts](https://github.com/TIBCOSoftware/cic-cli-main/blob/v1.0.0-beta.1/src/commands/profiles/add.ts)_

## `tibco profiles:initialize`

Initialize CLI and create default profile

```
USAGE
  $ tibco profiles:initialize

OPTIONS
  --no-warnings  Disable warnings from commands outputs

ALIASES
  $ tibco profiles:init
```

_See code: [src/commands/profiles/initialize.ts](https://github.com/TIBCOSoftware/cic-cli-main/blob/v1.0.0-beta.1/src/commands/profiles/initialize.ts)_

## `tibco profiles:list`

List all configured profiles

```
USAGE
  $ tibco profiles:list

OPTIONS
  --no-warnings  Disable warnings from commands outputs
```

_See code: [src/commands/profiles/list.ts](https://github.com/TIBCOSoftware/cic-cli-main/blob/v1.0.0-beta.1/src/commands/profiles/list.ts)_

## `tibco profiles:refresh-token`

Refresh a token for a profile

```
USAGE
  $ tibco profiles:refresh-token

OPTIONS
  --no-warnings      Disable warnings from commands outputs
  --profile=profile  Switch to different org or region using profile
```

_See code: [src/commands/profiles/refresh-token.ts](https://github.com/TIBCOSoftware/cic-cli-main/blob/v1.0.0-beta.1/src/commands/profiles/refresh-token.ts)_

## `tibco profiles:remove [NAME]`

Remove profiles from configuration

```
USAGE
  $ tibco profiles:remove [NAME]

ARGUMENTS
  NAME  Name of the profile to be removed

OPTIONS
  --no-warnings  Disable warnings from commands outputs
```

_See code: [src/commands/profiles/remove.ts](https://github.com/TIBCOSoftware/cic-cli-main/blob/v1.0.0-beta.1/src/commands/profiles/remove.ts)_

## `tibco profiles:set-default [NAME]`

Change the default profile

```
USAGE
  $ tibco profiles:set-default [NAME]

ARGUMENTS
  NAME  Profile name

OPTIONS
  --no-warnings  Disable warnings from commands outputs
```

_See code: [src/commands/profiles/set-default.ts](https://github.com/TIBCOSoftware/cic-cli-main/blob/v1.0.0-beta.1/src/commands/profiles/set-default.ts)_
