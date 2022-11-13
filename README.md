# TIBCO Cloud™ CLI

TIBCO Cloud™ CLI will help you to quickly interact with TIBCO Cloud™ capabilities and manage its resources from your machine. It will also help you to automate your tasks, manage local dev environments or can be a part of CI/CD pipeline.

<img src="./media/cli.png">

This CLI can be extended by creating plugins. Checkout plugins developed by TIBCO - [Plugins Developed](#plugins-developed). \
You can also create custom CLI plugins for your use cases. For more details on developing plugins, see [Developers](#developers) section of the documentation.

## Table of Contents
1. [Installing the CLI](#installing-the-cli)
    1.  [Prerequisites](#prerequisites)
    2. [Install via command](#install-via-command)
    3. [Install manually](#install-manually)
    4. [Proxy settings](#proxy)
    5. [Verify installation](#verify-installation)
2. [Updating the CLI](#updating-the-cli)
3. [Uninstalling the CLI](#uninstalling-the-cli)
4. [Command format](#command-format)
5. [Configuring the CLI](#configuring-the-cli)
6. [Plugins](#plugins)
7. [Plugin configurations](#plugin-configurations)
8.  [Common command flags](#common-command-flags)
9.  [Developers](#developers)
10.  [Known issues](#known-issues)
11.  [Issues](#issues)
12.  [License](#license) 

## Installing the CLI
### Prerequisites

Should have libsecret installed for linux based machines. If not, use below commands -

- Debian/Ubuntu: `sudo apt-get install libsecret-1-dev`
- Red Hat-based: `sudo yum install libsecret-devel`
- Arch Linux: `sudo pacman -S libsecret`

> **_NOTE:_**  You don't need above if you are not using profiles feature and just going to set the token as a environment variable or pass it via flag.

### Install via command

For **Linux and macOS**, run below command on your terminal

```bash
curl -sL https://github.com/TIBCOSoftware/cic-cli-main/releases/latest/download/install.sh | bash
```

For **Windows**, run below command on your Windows powershell

```ps
iex ((New-Object System.Net.WebClient).DownloadString('https://github.com/TIBCOSoftware/cic-cli-main/releases/latest/download/install.ps1'))
```

### Install manually

CLI is distributed using tarballs. Below are the builds of the tarball:


| OS        |     Build      |
| --------- | :-----------:  | 
| Windows   | [tibco-cli-win-x86.zip](https://github.com/TIBCOSoftware/cic-cli-main/releases/latest/download/tibco-cli-win-x86.zip)<br>[tibco-cli-win-x64.zip](https://github.com/TIBCOSoftware/cic-cli-main/releases/latest/download/tibco-cli-win-x64.zip) | 
| macOS     | [tibco-cli-mac-x64.tar.gz](https://github.com/TIBCOSoftware/cic-cli-main/releases/latest/download/tibco-cli-mac-x64.tar.gz)<br> [tibco-cli-mac-arm.tar.gz](https://github.com/TIBCOSoftware/cic-cli-main/releases/latest/download/tibco-cli-mac-arm.tar.gz)  |
| Linux   | [tibco-cli-linux-x64.tar.gz](https://github.com/TIBCOSoftware/cic-cli-main/releases/latest/download/tibco-cli-linux-x64.tar.gz)<br>[tibco-cli-linux-arm.tar.gz](https://github.com/TIBCOSoftware/cic-cli-main/releases/latest/download/tibco-cli-linux-arm.tar.gz)|
#### For linux and macOS

- Download archive from below link

  ```bash
  curl https://github.com/TIBCOSoftware/cic-cli-main/releases/latest/download/{build name from the above table} -fsSL -O
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

#### For windows


- Download archive from above [download table](#download) or using curl
- Extract the archive
- Set path variable to extracted folder's bin folder in environment variables
This can be done by navigating to `This PC -> Right click -> properties -> Adv System Settings -> Environment variables` \
OR  
`setx /M PATH "%PATH%;<CLI's bin folder's path>"`

> **_NOTE:_** You can use same above steps in case you want to update the CLI manually Or to update it with the specific version.

### Proxy

In case your machine is behind proxy. Set proxy in environment variables

```bash
export http_proxy="http://PROXY_SERVER:PORT"
export https_proxy="https://PROXY_SERVER:PORT"
```

### Verify installation

Try to run following command in your terminal

```bash
tibco --version
```

## Updating the CLI

- If you have [installed CLI via the command](#install-via-command) mentioned above, then use same installation command to update the CLI.
- If you have [installed CLI manually](#install-manually), then just download the latest CLI tarball and extract it to the same location (replace) where currently CLI resides.
- Updating the CLI won’t uninstall your plugins.

## Uninstalling the CLI

**For MacOS and Linux**

```bash
tibco clean-all -—confirm
rm -rf ~/tibco-cli     # delete the folder where the main CLI is installed. use `which tibco` to find where it resides.
```

**For Windows**

```
tibco clean-all --confirm
rmdir /s/q %LOCALAPPDATA%\tibco-cli
```


## Command format

Commands can have either of the below formats

```
tibco <topic>:<command>  [flags] <args>
tibco <topic>:<command>   <args> [flags]
tibco <topic>:<sub-topic>:<command> [flags] <args>
```

For E.g:
```
tibco asyncapi:transform --to flogo --from ./myasyncapi.yml
```

Commands that interact with the same resources/assets are grouped together under a group name. Such groups are called topics. \
For E.g: config is a topic(group) that manages all CRUD operations on a config file.

```
tibco config:set
tibco config:add
tibco config:get
```

Topics can have sub topics too. \
E.g: On our TCI platform we have the capability of running Flogo apps or BusinessWork apps. Commands can be grouped together for each capabilities.
```
tibco tci:bw:do-something
tibco tci:flogo:add-trigger
```

Here `tci` is a topic, `flogo` is a subtopic and `add-trigger` is a command.

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

## Configuring the CLI

You can set up the CLI in either of the below ways to interact with the TIBCO Cloud:

1. [Set up the enivronment variable](#setting-up-the-environment-variable)
2. [Pass the token and region flag to the command](#token-and-region-flags)
3. [Configure and use CLI profiles](#configure-and-use-cli-profiles)

### Setting up the environment variable

 Set the token and region of the TIBCO Cloud as a environment variable before running the CLI commands.  \
 For token - `TIBCO_CLI_OAUTH_TOKEN`  \
 For region - `TIBCO_REGION`

### Token and region flags

Use `--token` and `--flags` while running every CLI commands.

> **Note** Try to avoid this approach since passing the token flag on the terminal will save the token on the terminal's session history.

### Configure and use CLI profiles

Run the below command that will walk you through the authentication process of the TIBCO Cloud and will generate default CLI profile.

```bash
tibco profiles:initialize
```

Profile is a set of configurations grouped together. Currently **org** and **region** of the TIBCO Cloud are grouped together under a profile.This help commands to identify where to interact in the TIBCO Cloud.


Whenever command is executed, it will pick up the configuration(org & region) based on the profile mentioned in the command. If profile is not mentioned then it will fallback to the default profile.
Profiles can be mentioned as a command flag.
For e.g.: `tibco tcam:list-apis --profile eu-user`

You can add multiple profiles for different orgs and region using below command 
```
tibco profiles:add
```

Below are the list of commands to manage profiles in the CLI -
* [`tibco profiles:add`](./docs/profiles.md#tibco-profilesadd)
* [`tibco profiles:initialize`](./docs/profiles.md#tibco-profilesinitialize)
* [`tibco profiles:list`](./docs/profiles.md#tibco-profileslist)
* [`tibco profiles:refresh-token`](./docs/profiles.md#tibco-profilesrefresh-token)
* [`tibco profiles:remove [NAME]`](./docs/profiles.md#tibco-profilesremove-name)
* [`tibco profiles:set-default [NAME]`](./docs/profiles.md#tibco-profilesset-default-name)

> **_NOTE:_** Profiles are expired if not used in 14 days. If profile is expired, delete it and create new profile with same name.

## Plugins

This CLI has a plugin-based architecture, that can be extended by creating plugins.\
Below are the commands for managing plugins: 
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
| [cli-plugin-tci-flogo](https://www.npmjs.com/package/@tibco-software/cli-plugin-tci-flogo) | Plugin to help you to perform the Flogo® specific tasks.|


## Plugin configurations

Some plugins and topics might also need persistent configurations. These configurations are maintained in `tibco-cli-config.ini` file. \
Every **section** and **subsection** of ini file represents configurations for **topics** and **subtopics** of the plugin respectively. Topics are set of commands grouped together in the plugin.  \
E.g.: suppose we have a plugin for TIBCO Cloud Integration and it has three topics flogo, nodejs and businessworks
`tibco tci:flogo:<command>`  
`tibco tci:bw:<command>`  
`tibco tci:node:<command>`

Then `tibco-cli-config.ini` should look like below

```ini
[tci]
property=value # some tci level properties and values that may/ may not apply to flogo and bw

[tci.flogo] # subsection to maintain properties for flogo based commands
property=value
arr[]=1
arr[]=2


[tci.bw] # subsection to maintain properties for bw based commands
property=value

[tci.node] # subsection to maintain properties for bw based commands
property=value


[tcam] # section to maintain properties for tcam topic of tcam plugin
property=value

```

#### Files hierarchy

`tibco-cli-config.ini` can be at local and global level.  
Properties of local config file has a higher precendence over a global config file properties.  
Command will pick local config file by default if it is present in your current working directory with name as `tibco-cli-config.ini`.  \
You can also store local config file with different name and at different location.Then you can pass config file as a flag `--config $HOME/downloads/myconfig.ini` to the command.  
Local config file can be helpful in case any developer wants to share cli config file along with their project code.


Below are the list of commands to manage plugin configurations in the CLI -

* [`tibco config:get PROPERTY`](./docs/config.md#tibco-configget-property)
* [`tibco config:print`](./docs/config.md#tibco-configprint)
* [`tibco config:set PROPERTY VALUE`](./docs/config.md#tibco-configset-property-value)
* [`tibco config:unset PROPERTY`](./docs/config.md#tibco-configunset-property)

## Confidentials

Confidential data like tokens, refresh tokens and client secret are stored at:

- Keychain for macOS
- Credential vault for Windows
- Libsecret for Linux

## Common command flags

Common flags are availabe to most of the commands of CLI. \
They may be disabled for specific commands.

### --profile

Use profile to quickly switch your configurations (Org or region).
If no profile mentioned then default profile is considered.\
For E.g.:

```
tibco tci:show-apps --profile eu-user
```

### --token

Pass the token flag to the command which interacts with TIBCO Cloud. This is alternative way to the profiles. \
For E.g.:
```
tibco tci:show-apps --token CIC~asdfqwerty  --region eu
```

### --region

Specify the region of the TIBCO Cloud. Use this flag along with the token flag.  \
Possible values are us, eu and au.  \
For E.g.:
```
tibco tci:show-apps --token CIC~asdfqwerty --region eu
```

### --config

Path to the local config file if your cwd is not having `tibco-cli-config.ini` \
For E.g.:
```
tibco asyncapi:transform --config $HOME/desktop/myconfig.ini
```

### --no-warnings

Disable warnings from command outputs.\
For E.g.:

```
tibco asyncapi:transform --to flogo from ./spec.yml --no-warnings
```

### --help

See all flags and arguments for the corresponding command.  \
For E.g.:

```
tibco asyncapi:transform --help
```

## Developers

- To create a CLI plugin checkout [oclif.io](https://oclif.io), since this CLI is based on oclif framework.
- [Build Plugins on TIBCO Cloud CLI](https://www.walkthrough.so/pblc/niqkfEnGwRZM/build-plugins-for-tibco-cloud-tm-cli?sn=0) will guide you to develop your first sample plugin.
- You will also need a [cli-core](https://github.com/TIBCOSoftware/cic-cli-core) package to get some features and utilities OOTB (it’s a must dependency).

## Known issues

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
