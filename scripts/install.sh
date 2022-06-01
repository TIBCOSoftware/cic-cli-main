#!/usr/bin/env bash

arch=$(uname -m)
os=$(uname -s)
app_locn="${HOME}/tibco-cli"

if [ "${SHELL}" == "/bin/bash" ]; 
then
    rcfile="${HOME}/.bashrc"
    path_cmd="export PATH=\$PATH:${app_locn}/bin"
elif [ "${SHELL}" == "/bin/zsh" ]; 
then
    rcfile="${HOME}/.zshrc"
    path_cmd="export PATH=\$PATH:${app_locn}/bin"
elif [ "${SHELL}" == "/bin/ksh" ]; 
then
    rcfile="${HOME}/.kshrc"
    path_cmd="export PATH=\$PATH:${app_locn}/bin"
elif [ "${SHELL}" == "/bin/sh" ]; 
then
    rcfile="${HOME}/.profile"
    path_cmd="export PATH=\$PATH:${app_locn}/bin"
elif [ "${SHELL}" == "/bin/dash" ]; 
then
    rcfile="${HOME}/.profile"
    path_cmd="export PATH=\$PATH:${app_locn}/bin"
elif [ "${SHELL}" == "/bin/csh" ]; 
then
    rcfile="${HOME}/.cshrc"
    path_cmd="setenv PATH \$PATH\:${app_locn}/bin"
elif [ "${SHELL}" == "/bin/tcsh" ]; 
then
    rcfile="${HOME}/.tcshrc"
    path_cmd="setenv PATH \$PATH\:${app_locn}/bin"
else
    echo "Does not support installation for $0 shell. Try installing it manually for $0 shell"
    exit 1
fi


if [ "${arch}" == "x86_64" ] && [ "${os}" == "Darwin" ]; 
then
    build_file="tibco-cli-mac-x64.tar.gz"
elif [ "${arch}" == "arm" ] && [ "${os}" == "Darwin" ]; 
then
    build_file="tibco-cli-mac-arm.tar.gz"
elif [ "${arch}" == "x86_64" ] && [ "${os}" == "Linux" ]; 
then
    build_file="tibco-cli-linux-x64.tar.gz"
elif [ "${arch}" == "arm" ] && [ "${os}" == "Linux" ]; 
then
    build_file="tibco-cli-linux-arm.tar.gz"
else
    echo "CLI Build is not compatible with your machine"
    echo "Supported OS is Linux or Mac And arch is x64 or arm"
    exit 1;
fi



download_link="https://github.com/TIBCOSoftware/cic-cli-main/releases/latest/download/${build_file}"
echo "Current machine is ${os} ${arch}.\nDownloading latest TIBCO Cloud™ CLI from ${download_link}"
curl ${download_link} -fsSL -o "/tmp/${build_file}"

if [ $? -ne 0 ];
then
    echo "Download latest CLI failed. Please check your internet connection or try to install manually"
    exit 1
fi


mkdir -p ${app_locn} 
echo "Installing CLI at ${app_locn}"
tar -xf "/tmp/${build_file}" -C "${app_locn}" --strip-components 1

echo "${path_cmd}" >> ${rcfile}


if [ "${os}" == "Darwin" ] && [ "${SHELL}" == "/bin/bash" ];
then
    echo "source \$HOME/.bashrc" >> "${HOME}/.bash_profile"
fi

rm -rf "/tmp/${build_file}"
echo "TIBCO Cloud™ CLI installed successfully!! Try running \"tibco\" on the new terminal"