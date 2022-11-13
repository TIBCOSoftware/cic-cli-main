`tibco clean-all`
=================

Remove all profiles, configurations, CLI plugins and cache data

* [`tibco clean-all`](#tibco-clean-all)

## `tibco clean-all`

Remove all profiles, configurations, CLI plugins and cache data

```
USAGE
  $ tibco clean-all

OPTIONS
  -c, --confirm      Confirm that you want to remove all of your profiles, plugins and cache data
  --config=config    Path to the local config file
  --no-warnings      Disable warnings from command's output
  --profile=profile  Switch to different org or region using profile.
  --region=us|eu|au  Region of the TIBCO Cloud.
  --token=token      OAuth token to interact with the TIBCO cloud.(Should pass region flag with this flag)
```

_See code: [src/commands/clean-all.ts](https://github.com/TIBCOSoftware/cic-cli-main/blob/v1.1.0/src/commands/clean-all.ts)_
