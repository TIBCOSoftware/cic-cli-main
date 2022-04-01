ARCH=$(uname -m)
OS=$(uname -s)

APP_LOCN=$HOME/tibco-cli

if [ "$SHELL" == "/bin/bash" ]; then
    RCFILE="$HOME/.bashrc"
elif [ "$SHELL" == "/bin/zsh" ]; then
    RCFILE="$HOME/.zshrc"
elif [ "$SHELL" == "/bin/csh"]; then
    RCFILE="$HOME/.cshrc"
elif [ "$SHELL" == "/bin/ksh"]; then
    RCFILE="$HOME/.kshrc"
elif [ "$SHELL" == "/bin/tcsh"]; then
    RCFILE="$HOME/.tcshrc"
else
    echo "Does not support installation for $0 shell. Try installing it manually for $0 shell"
    exit 2
fi


if [ "$ARCH" == "x86_64" ] && [ "$OS" == "Darwin" ]; then
    BUILD_FILE="tibco-cli-mac-x64.tar.gz"
elif [ "$ARCH" == "arm" ] && [ "$OS" == "Darwin" ]; then
    BUILD_FILE="tibco-cli-mac-arm.tar.gz"
elif [ "$ARCH" == "x86_64" ] && [ "$OS" == "Linux" ]; then
    BUILD_FILE="tibco-cli-linux-x64.tar.gz"
elif [ "$ARCH" == "arm" ] && [ "$OS" == "Linux" ]; then
    BUILD_FILE="tibco-cli-linux-arm.tar.gz"
else
    echo "CLI Build not compatible with your machine."
    echo "Supported OS is Linux or Mac And arch is x64 or arm"
    exit 2;
fi



curl "https://github.com/TIBCOSoftware/cic-cli-main/releases/latest/download/$BUILD_FILE"  -fsSL -O
mkdir $APP_LOCN
tar -xf $BUILD_FILE -C $APP_LOCN --strip-components 1
echo "\nexport PATH=\$PATH:$APP_LOCN/bin" >> $RCFILE
echo "TIBCO Cloud CLI installed successfully!! Try running \"tibco\" on the new terminal"
