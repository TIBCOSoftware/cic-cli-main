# Check platform
$arch = $env:PROCESSOR_ARCHITECTURE
if ($arch -eq 'x86') {
    $buildFile = "tibco-cli-win-x86.zip"
}
elseif ($arch -eq 'AMD64') {
    $buildFile = "tibco-cli-win-x64.zip"  
}
else {
    Write-Host "CLI Build is not compatible with your machine"
    Write-Host "Supported platforms are x86 and x64"
    return
}

# Download CLI zip file
$downloadLink = "https://github.com/TIBCOSoftware/cic-cli-main/releases/latest/download/${buildFile}"
$zipLocn = "$env:temp\$buildFile"
Write-Host "Downloading latest TIBCO Cloud CLI from $downloadLink"
Invoke-WebRequest -Uri "$downloadLink" -OutFile "$zipLocn"
 


# Replace CLI folder at install location
$installLocn = "$env:LOCALAPPDATA\tibco-cli"

if (Test-Path -Path "$installLocn") {
    Remove-Item -LiteralPath "$installLocn" -Force -Recurse
}

New-Item -Path "$installLocn" -ItemType Directory | Out-Null


# extract folder to install location
# reference -> https://github.com/hashicorp/best-practices/blob/master/packer/scripts/windows/install_windows_updates.ps1#L12-L22
# Older versions of Powershell do not have 'Expand Archive'
# Use Shell.Application custom object to unzip
# https://stackoverflow.com/questions/27768303/how-to-unzip-a-file-in-powershell
Write-Host "Installing CLI at $installLocn. This might take several minutes"
$shell = New-Object -ComObject Shell.Application
$zipFile = $shell.NameSpace("$zipLocn")
$destinationFolder = $shell.NameSpace("$installLocn")
$copyFlags = 0x00
$copyFlags += 0x04 # Hide progress dialogs
$copyFlags += 0x10 # Overwrite existing files
$destinationFolder.CopyHere($zipFile.Items(), $copyFlags)

# clean up
Remove-Item -Force -Path "$zipLocn"


# set user environment variable
# reference -> https://stackoverflow.com/questions/714877/setting-windows-powershell-environment-variables
[Environment]::SetEnvironmentVariable("Path", "$env:Path" + ";$installLocn\bin", [System.EnvironmentVariableTarget]::User)

Write-Host "TIBCO Cloud CLI installed successfully! Try running 'tibco' on the new Powershell or Command Prompt"