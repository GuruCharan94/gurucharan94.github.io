---
title: Side by Side install of multiple versions of NodeJS and NPM with NVM on Windows 10
date: 2020-05-03
header:
  teaser: "/assets/images/node-on-windows-10.jpg"
  thumbnail:  "/assets/images/node-on-windows-10.jpg"
  og_image: "/assets/images/node-on-windows-10.jpg"
categories:
- Node 
tags:
- Node
- Web
- Javascript
ogImage:
  title: "**Side by Side install of multiple versions of NodeJS and NPM with NVM on Windows 10**"
  subtitle: "www.gurucharan.in | @gurucharan94"
  filename: "node-on-windows-10"
  fontSize:  "120%"
excerpt: This blog post shows you how to install and manage multiple versions of NodeJS, Node Package Manager (NPM) using Node Version Manager (NVM) on Windows 10
---

I already have NodeJS installed on my machine. But I start working on a different project and that sometimes requires a higher or lower version of NodeJS. So, I wanted to see if I can have multiple versions of NodeJS installed side-by-side. This blog post shows you how to install and manage multiple versions of NodeJS, Node Package Manager (NPM) using Node Version Manager (NVM) on Windows 10.

I found a nice project on [Github](https://github.com/coreybutler/nvm-windows) that helps me install and manage multiple version of NodeJS on a windows machine.According to the project, this is the npm/Microsoft/Google recommended Node.js version manager for Windows.

## Installation of NVM for Windows

Head over to the [release page](https://github.com/coreybutler/nvm-windows/releases) to download the latest version of NVM.

- Before you extract and install NVM, make sure that you remove any previous installations of NodeJS.Also ensure to delete any existing NodeJS installation directories `"C:\Program Files\nodejs"` that might remain.

- You should also delete the existing npm install location `"C:\Users\<user>\AppData\Roaming\npm"`, so that the nvm install location will be correctly used instead.

Then extract the files and run the setup. Next, Next, Next, I accept the terms and finish. Once the installation is complete, you can open PowerShell **as administrator** and run `nvm` to check if everything is installed correctly.

![NVM Windows PowerShell](/assets/images/nvm-windows-powershell.png)

## Install Node, NPM using NVM

Now, the next thing to do is install the required versions of NodeJS and see how to switch between them.

- `nvm list available` shows you a list of available node downloads
- `nvm install <version>` downloads and installs said version
- `nvm use <version>` activates specified version of node. You can then type `node -v` to confirm the installation. `npm -v` tells you what version of NPM you have.

You can install another version of Node on your machine side by side with existing install by invoking `nvm install <version>` and switch to the newer version using `nvm use <version>`.

Global utilities like gulp will have to be installed separately for each installed version of Node.

I also needed to install yarn and I did that using the `npm i -g yarn` command.

## Common Issues

Now that the installations are completed, here are some [known issues](https://github.com/coreybutler/nvm-windows/wiki/Common-Issues) that you have to keep in mind when using NVM for Windows.

- As of writing, only official Windows terminals are supported (CMD and PowerShell).

- NVM is an installer and so Windows requires elevated administrative privileges to perform specific functions like running `nvm use`.

- You have to uninstall previous versions of Node before installing NVM for Windows.

This blog post showed you how to use [NVM Windows](https://github.com/coreybutler/nvm-windows) to manage your node versions side by side on Windows and a few of the issues that you need to keep in mind when using NVM.
