# TIBCO Cloud™ CLI

This CLI will help you to quickly interact with TIBCO Cloud™ capabilities using terminal and would provide simplicity to manage your local development and build environments.

## Installation

CLI is distributed using tarballs. Download tarball from below links based on your machine OS.

### Prerequisites

Should have libsecret installed for linux based machines. If not, use below commands -

- Debian/Ubuntu: `sudo apt-get install libsecret-1-dev`
- Red Hat-based: `sudo yum install libsecret-devel`
- Arch Linux: `sudo pacman -S libsecret`

### Download link

| OS        |     Link      |
| --------- | :-----------: |
| linux-x64 | `curl <link>` |
| linux-arm | `curl <link>` |
| macOS     | `curl <link>` |
| Windows   | `curl <link>` |

### Steps

- Download tar from above link

  ```bash
  curl <link>
  ```

- Create a directory to keep installed CLI

  ```bash
  mkdir ~/tibco-cli
  ```

- Extract tar package to the created folder

  ```bash
  tar -xf <file-name> -C ~/tibco-cli --strip-components 1
  ```

- Set up envrionment variables for current terminal session

  ```bash
  export PATH=~/tibco-cli/bin:$PATH
  ```

  If you want to set environment variables permanently, find which shell is getting used

  ```bash
  echo $SHELL
  ```

  or

  ```bash
  ps -p $$
  ```

  As per your shell add these lines in your ~/.bashrc or ~/.zshrc file

  ```bash
  PATH=~/tibco-cli/bin:$PATH
  ```

For windows, extract tar using [7zip](https://www.7-zip.org/).\
Set path to extraced folder's bin folder in environment variables by navigating to\
This PC -> Right click -> properties -> Adv System Settings -> Environment variables

### Proxy

In case your machine is behind proxy. Set proxy in environment variables

```bash
export http_proxy="http://PROXY_SERVER:PORT"
export https_proxy="https://PROXY_SERVER:PORT"
```

### Verify Installation

Try to run following command in your terminal

```bash
tibco --version
```

## Configure CLI

Configure your CLI so that you can interact with TIBCO Cloud.\
Start with following command:

```bash
tibco profile:initialize
```

This will walk you through authentication process and will generate default CLI profile.
Profile in CLI is a set of congfigurations clubbed together. You can create multiple profiles.
Whenever command is executed it picks up the configuration based on a default profile or the one mentioned in command.\
Currently the TIBCO Cloud organizations and regions are tied to the profile. If you need to switch to different org or region quickly then you need to add profile to the CLI configuration once.
Then while executing commands just need to pass the profile name as a command option.
Profile E.g:

```json
[
  {
    "name": "eu-user",
    "region": "eu",
    "org": "dev-analytics"
  },
  {
    "name": "us-user",
    "region": "us",
    "org": "uat-integration"
  }
]
```

This configuration is stored at:

`~/.config/@tibco/cic-cli-main/profiles.json (Linux & Mac)`\
OR  
`%USERPROFILE%\.config\@tibco\cic-cli-main\profiles.json (Windows)`

To see all commands on configuration and profile management, check this link - [config](./docs/profiles.md)

### Confidentials

Confidential data like tokens, refresh tokens and client secret are stored at:

- Keychain for MacOS
- Credential vault for Windows
- Libsecret for Linux

## Comman Command Flags

These flags are availabe to most commands of CLI.
These may be disabled for specific commands.

### --profile <string>

Use profile to quickly switch your configurations (Org or region).
If no profile mentioned then default profile is considered.\
For E.g:

```
tibco tci:show-apps --profile eu-user
```

### --no-warnings

Disable warnings from command outputs.\
For E.g:

```
tibco asyncapi:transform --to flogo from ./spec.yml --no-warnings
```

### --help

See all flags and arguments for the corresponding command.

For E.g:

```
tibco asyncapi:transform help
```

## Plugins

This CLI has a plugin-based architecture, that can be extended by creating plugins.\
Currently, we have a single plugin [Asyncapi](https://asyncapi.io/), which is helpful to transform your asyncapi spec into sample flogo template.\
Plugin information can be found here [@tibco-software/cic-cli-plugin-asyncapi](https://www.npmjs.com/package/@tibco/cli-plugin-asyncapi)

## Developers

If you are interested to develop some CLI plugin and attach it to CLI. Checkout [oclif](https://oclif.io) plugin dev, as this CLI is based on oclif framework. While development use this package [@tibco-software/cic-cli-core](https://www.npmjs.com/package/@tibco/cic-cli-core) as it will ease your development of commands to certain extent.

## Issues

In case you find any issue, raise it here via the "Issues" tab of this GitHub repository.

## License

**BSD**
