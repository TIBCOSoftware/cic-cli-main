`tibco profiles`
================

Manage CLI profiles for use with the TIBCO Cloud

* [`tibco profiles:add`](#tibco-profilesadd)
* [`tibco profiles:initialize`](#tibco-profilesinitialize)
* [`tibco profiles:list`](#tibco-profileslist)
* [`tibco profiles:refresh-token`](#tibco-profilesrefresh-token)
* [`tibco profiles:remove [NAME]`](#tibco-profilesremove-name)
* [`tibco profiles:set-default [NAME]`](#tibco-profilesset-default-name)

## `tibco profiles:add`

Add profiles to your configuration

```
USAGE
  $ tibco profiles:add

OPTIONS
  --config=config    Path to the local config file
  --no-warnings      Disable warnings from command output
  --region=us|eu|au  Region of the TIBCO Cloud.
  --token=token      OAuth token to interact with the TIBCO cloud.(Should pass region flag with the token flag)
```

_See code: [src/commands/profiles/add.ts](https://github.com/TIBCOSoftware/cic-cli-main/blob/v1.1.0/src/commands/profiles/add.ts)_

## `tibco profiles:initialize`

Initialize the CLI and create your default profile

```
USAGE
  $ tibco profiles:initialize

OPTIONS
  --config=config    Path to the local config file
  --no-warnings      Disable warnings from command output
  --region=us|eu|au  Region of the TIBCO Cloud.
  --token=token      OAuth token to interact with the TIBCO cloud.(Should pass region flag with the token flag)

ALIASES
  $ tibco profiles:init
```

_See code: [src/commands/profiles/initialize.ts](https://github.com/TIBCOSoftware/cic-cli-main/blob/v1.1.0/src/commands/profiles/initialize.ts)_

## `tibco profiles:list`

List all configured profiles

```
USAGE
  $ tibco profiles:list

OPTIONS
  --config=config    Path to the local config file
  --no-warnings      Disable warnings from command output
  --region=us|eu|au  Region of the TIBCO Cloud.
  --token=token      OAuth token to interact with the TIBCO cloud.(Should pass region flag with the token flag)

ALIASES
  $ tibco profiles:ls
```

_See code: [src/commands/profiles/list.ts](https://github.com/TIBCOSoftware/cic-cli-main/blob/v1.1.0/src/commands/profiles/list.ts)_

## `tibco profiles:refresh-token`

Refresh a token for a profile

```
USAGE
  $ tibco profiles:refresh-token

OPTIONS
  --config=config    Path to the local config file
  --no-warnings      Disable warnings from command output
  --profile=profile  Switch to a different organization or region using profile
  --region=us|eu|au  Region of the TIBCO Cloud.
  --token=token      OAuth token to interact with the TIBCO cloud.(Should pass region flag with the token flag)
```

_See code: [src/commands/profiles/refresh-token.ts](https://github.com/TIBCOSoftware/cic-cli-main/blob/v1.1.0/src/commands/profiles/refresh-token.ts)_

## `tibco profiles:remove [NAME]`

Remove profiles from the configuration

```
USAGE
  $ tibco profiles:remove [NAME]

ARGUMENTS
  NAME  Name of the profile to remove

OPTIONS
  --config=config    Path to the local config file
  --no-warnings      Disable warnings from command output
  --region=us|eu|au  Region of the TIBCO Cloud.
  --token=token      OAuth token to interact with the TIBCO cloud.(Should pass region flag with the token flag)

ALIASES
  $ tibco profiles:rm
```

_See code: [src/commands/profiles/remove.ts](https://github.com/TIBCOSoftware/cic-cli-main/blob/v1.1.0/src/commands/profiles/remove.ts)_

## `tibco profiles:set-default [NAME]`

Change the default profile

```
USAGE
  $ tibco profiles:set-default [NAME]

ARGUMENTS
  NAME  Profile name

OPTIONS
  --config=config    Path to the local config file
  --no-warnings      Disable warnings from command output
  --region=us|eu|au  Region of the TIBCO Cloud.
  --token=token      OAuth token to interact with the TIBCO cloud.(Should pass region flag with the token flag)

ALIASES
  $ tibco profiles:use
```

_See code: [src/commands/profiles/set-default.ts](https://github.com/TIBCOSoftware/cic-cli-main/blob/v1.1.0/src/commands/profiles/set-default.ts)_
