# TIBCO Cloud™ CLI

TIBCO Cloud™ CLI will help you to quickly interact with TIBCO Cloud™ capabilities and manage its resources from your machine. It will also help you to automate your tasks, manage local dev environments or can be a part of CI/CD pipeline.

<img src="./media/cli.png">

This CLI can be extended by creating plugins. Checkout plugins developed by TIBCO - [Plugins Developed](#plugins-developed). \
You can also create custom CLI plugins for your use cases. For more details on developing plugins, see [Developers](#developers) section of the documentation.

## Table of Contents
1. [Installation](#installation)
    1.  [Prerequisites](#prerequisites)
    2.  [Download Build](#download)
    3.  [Steps](#steps)
    4.  [Proxy Settings](#proxy)
    5.  [Verify Installation](#verify-installation)
2.  [Command Format](#command-format)
3.  [Configure CLI](#configure-cli)
4.  [Common Command Flags](#common-command-flags)
5.  [Plugins](#plugins)
6.  [Developers](#developers)
7.  [Known Issues](#known-issues)
8.  [Issues](#issues)
9.  [License](#license) 






## Installation

CLI is distributed using tarballs. Download tarball from below links based on your machine OS.

### Prerequisites

Should have libsecret installed for linux based machines. If not, use below commands -

- Debian/Ubuntu: `sudo apt-get install libsecret-1-dev`
- Red Hat-based: `sudo yum install libsecret-devel`
- Arch Linux: `sudo pacman -S libsecret`

### Download

#### Builds

| OS        |     Build      |
| --------- | :-----------:  | 
| Windows   | [tibco-cli-win-x86.zip](https://github.com/TIBCOSoftware/cic-cli-main/releases/download/v1.0.0-beta.1/tibco-cli-win-x86.zip)<br>[tibco-cli-win-x64.zip](https://github.com/TIBCOSoftware/cic-cli-main/releases/download/v1.0.0-beta.1/tibco-cli-win-x64.zip) | 
| macOS     | [tibco-cli-mac-x64.tar.gz](https://github.com/TIBCOSoftware/cic-cli-main/releases/download/v1.0.0-beta.1/tibco-cli-mac-x64.tar.gz)<br> [tibco-cli-mac-arm.tar.gz](https://github.com/TIBCOSoftware/cic-cli-main/releases/download/v1.0.0-beta.1/tibco-cli-mac-arm.tar.gz)  |
| Linux   | [tibco-cli-linux-x64.tar.gz](https://github.com/TIBCOSoftware/cic-cli-main/releases/download/v1.0.0-beta.1/tibco-cli-linux-x64.tar.gz)<br>[tibco-cli-linux-arm.tar.gz](https://github.com/TIBCOSoftware/cic-cli-main/releases/download/v1.0.0-beta.1/tibco-cli-linux-arm.tar.gz)|


### Steps

#### For Linux and macOS

- Download archive from below link

  ```bash
  curl https://github.com/TIBCOSoftware/cic-cli-main/releases/latest/download/{build name from above table} -fsSL -O
  ```

- Create a directory to keep installed CLI

  ```bash
  mkdir ~/tibco-cli
  ```

- Extract tar package to the created folder

  ```bash
  tar -xf <build file name> -C ~/tibco-cli --strip-components 1
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

#### For Windows
- Download archive from above [download table](#download) or using curl
- Extract the archive
- Set path variable to extracted folder's bin folder in environment variables
This can be done by navigating to `This PC -> Right click -> properties -> Adv System Settings -> Environment variables` \
OR  
`setx /M PATH "%PATH%;<CLI's bin folder's path>"`

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
## Command Format
```
tibco <plugin name>:<command>  [flags] <args> 
```

For E.g:
```
tibco asyncapi:transform --to flogo --from ./myasyncapi.yml
```

### Flags
For long flags use `--`  \
For short flags use `-`  \
Flags can be mentioned in multiple ways:
```
tibco apps:create --name myNodeJsAPP
tibco apps:create --name=myNodeJsAPP
tibco apps:create -n myNodeJsAPP
tibco apps:create -n=myNodeJsAPP --force
```
> **_NOTE:_** Values (true | false) should not be passed when flags are boolean. Parser will consider that true | false as command arguements. 


## Configure CLI

Configure your CLI so that you can interact with TIBCO Cloud.\
Start with the below command:

```bash
tibco profiles:initialize
```

This will walk you through authentication process and will generate default CLI profile. \
Profile in CLI is a set of configurations clubbed together (currently org and region). You can create multiple profiles. \
Whenever command is executed it picks up the configuration based on the profile mentioned in command or the default profile. \
Currently the TIBCO Cloud organizations and regions are tied to the profile. \
If you need to switch to different org or region then you need to add profile to the CLI configuration. This can be done using command `tibco profiles:add`. \
Then while executing commands just need to pass the profile name as a command option.  \
For e.g `tibco tcam:list-apis --profile eu-user` \
Profiles data is stored as json in below format.

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

This file is located at:

`~/.config/@tibco/cic-cli-main/profiles.json (Linux & Mac)`\
OR  
`%USERPROFILE%\.config\@tibco\cic-cli-main\profiles.json (Windows)`

To see all commands on **profile management**, check this link - [profiles](./docs/profiles.md)

### Confidentials

Confidential data like tokens, refresh tokens and client secret are stored at:

- Keychain for macOS
- Credential vault for Windows
- Libsecret for Linux

## Common Command Flags

Common flags are availabe to most of the commands of CLI. \
They may be disabled for specific commands.

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
tibco asyncapi:transform --help
```

## Plugins

This CLI has a plugin-based architecture, that can be extended by creating plugins.\
Below are the commands for managing plugins - 
* [`tibco plugins`](./docs/plugins.md#tibco-plugins)
* [`tibco plugins:inspect PLUGIN...`](./docs/plugins.md#tibco-pluginsinspect-plugin)
* [`tibco plugins:install PLUGIN...`](./docs/plugins.md#tibco-pluginsinstall-plugin)
* [`tibco plugins:link PLUGIN`](./docs/plugins.md#tibco-pluginslink-plugin)
* [`tibco plugins:uninstall PLUGIN...`](./docs/plugins.md#tibco-pluginsuninstall-plugin)
* [`tibco plugins:update`](./docs/plugins.md#tibco-pluginsupdate)

#### Plugins developed
| Name                                                                                                | Description                                                                               |
|-----------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| [cli-plugin-tcapim](https://github.com/TIBCOSoftware/tcapim-cli-plugin)     |  Plugin to create and manage TIBCO Cloud™ API Management applications. |
| [cli-plugin-tcam](https://github.com/TIBCOSoftware/cic-cli-plugin-tcam)  |  Plugin to provide you the ability to run basic commands for TIBCO Cloud API Modeler features.
| [cli-plugin-asyncapi](https://github.com/TIBCOSoftware/cic-cli-plugin-asyncapi) | Plugin to transform your AsyncAPI spec(2.1.0) into sample flogo template.|

## Developers

If you are interested to develop some CLI plugin and attach it to CLI. Checkout [oclif](https://oclif.io) plugin dev, as this CLI is based on oclif framework.\
While development use this package [@tibco-software/cic-cli-core](https://www.npmjs.com/package/@tibco-software/cic-cli-core) as it will ease your development of commands to certain extent.

## Known Issues

### For macOS

#### Issue
In case you get any of these below errors while running command `tibco profiles:initialize`

<img src="./media/keytar-issue2.png" height="400" />
<img src="./media/keytar-issue1.png" height="555" />


#### Solution
1. Navigate to the path `Apple menu -> System Preferences -> Security & Privacy -> General`.
2. Click on `Allow anyway` button.

<img src="./media/keytar-soln.png" height="550"/>

## Issues

In case you find any issue, raise it here via the "Issues" tab of this GitHub repository.

## License

**BSD**
