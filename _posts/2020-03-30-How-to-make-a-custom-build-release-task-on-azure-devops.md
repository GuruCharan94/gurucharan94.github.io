---
title: How to make a custom build or release task on Azure DevOps
date: 2020-04-11
image : "assets/images/azure-devops-extension/release-pipeline.png"
header:
  teaser: "assets/images/azure-devops-extension/release-pipeline.png"
  thumbnail: "assets/images/azure-devops-extension/release-pipeline.png"
  og_image: "assets/images/azure-devops-extension/release-pipeline.png"
categories:
- Azure-devops
tags:
- NodeJs
- Azure-devops
- DevOps
excerpt: "In this blog post, I show you the different extension points of Azure DevOps, how to build a custom build task and how I use Azure DevOps to continuously deploy updates to your extensions."
---

I built and published a [couple of Azure DevOps build and release tasks to the marketplace](https://marketplace.visualstudio.com/publishers/gurucharan) and this blog post highlights tips, tricks, and lessons learnt along the way about developing custom extensions for Azure DevOps and publishing them to the marketplace.

## Understanding Azure DevOps Extensions

Azure DevOps extensions are add-ons that can be used to customize and extend your DevOps experience with [Azure DevOps Services](https://azure.microsoft.com/en-in/services/devops/). They are written with standard web technologies - HTML, JavaScript, CSS.

There are plenty of extensibility points on Azure DevOps. Some of the areas are

- Hubs and hub groups ( Files, Releases, Backlog, and Queries)
- Context Menus and toolbars
- Dashboards
- Work item form
- Azure Pipelines tasks and
- Service hooks

Take a look at the [official docs for a detailed explanation of the extension points](https://docs.microsoft.com/en-us/azure/devops/extend/reference/targets/overview?view=azure-devops).

## Custom Azure Pipelines Task

Although Azure DevOps offers different extensibility points, this blog post will only show details about building and publishing custom pipeline tasks on Azure DevOps. Most of the inbuilt tasks are open source and [you can find them on GitHub](https://github.com/microsoft/azure-pipelines-tasks).

I published the lighthouse task in the marketplace and [you can go through the source on GitHub](https://github.com/GuruCharan94/azure-devops-extensions/tree/master/lighthouse-ci). Before you go start directly reading the code, here are some important things to know about the extensions that will help you understand better what the code is doing and where to look.

The most important building blocks of a build task are

- [The extension manifest](https://github.com/GuruCharan94/azure-devops-extensions/blob/master/lighthouse-ci/vss-extension.json) that defines how the extension is listed in the marketplace.
  
- [The task.json file](https://github.com/GuruCharan94/azure-devops-extensions/blob/master/lighthouse-ci/lighthouse-ci-build-task/task.json) that defines the entry point of the extension under `execution` and the user inputs to the task.

- [Actual Code that does the work](https://github.com/GuruCharan94/azure-devops-extensions/blob/master/lighthouse-ci/lighthouse-ci-build-task/src/lighthouse-ci.ts) which is, in this case, a TypeScript file which is compiled to JavaScript and acts as the entry point of the execution.

Now that the code for the extension is ready, the next step towards getting it into the Marketplace is to package the files together as VSIX 2.0 compatible `.vsix` files. Microsoft provides the [tfx-cli](https://github.com/microsoft/tfs-cli), a cross-platform command-line interface (CLI) for you to package and publish your extension.

Once the tfx-cli is installed, you can run the below commands to publish your extensions.

```powershell
tfx extension create --manifest-globs vss-extension.json
tfx extension publish --manifest-globs your-manifest.json --share-with yourOrganization
```

If you want an in-depth tutorial on this, then take a look at [this tutorial that explains](https://docs.microsoft.com/en-us/azure/devops/extend/develop/add-build-task?view=azure-devops) the details on building a simple "Hello World" task and covers everything from setting up the development environment to publishing your extension to the marketplace.

## Friends don't let friends right-click publish

There is something missing in the tutorial. While you can use the [tfx-cli](https://github.com/microsoft/tfs-cli) to publish your extensions to the marketplace from your machine, there is a better way where you can use Azure DevOps pipelines to publish pipeline extensions.

You can use Azure DevOps to build, test, package, and publish Azure DevOps extensions using a Continuous Delivery Pipeline. You can have a private, beta, and a public version of the extension and progressively roll-out updates to your users once you think they are ready for prime time. All this is made possible using the [Azure DevOps Extension Tasks](https://marketplace.visualstudio.com/items?itemName=ms-devlabs.vsts-developer-tools-build-tasks) on the marketplace.

### How does my build and release pipelines look

The actual build steps of the Lighthouse CI task in Azure Pipelines looks includes tasks to

- Use a specific version of the tfx-cli
- npm install node packages
- Compile the TypeScript to JavaScript
- Package the extension into a vsix file and
- Publish a build artifact

Here is a screenshot of how the pipeline looks in Azure DevOps ![Screenshot of Build Pipeline](/assets/images/azure-devops-extension/extension-build.png)

Once the build pipeline is configured, the next step is to configure the release pipeline. My pipeline has 2 environments

- Private - Any new changes including builds from pull requests are published to the marketplace as a private extension in the marketplace. The private extension is shared with my account and I test my extensions here.

- Public - Once the extension works as intended, it is deployed to be publicly available.

Here is a screenshot of the release pipeline in Azure DevOps
![Release Pipeline](/assets/images/azure-devops-extension/release-envs.png)

and these are the steps in the environments.
![Release Pipeline](/assets/images/azure-devops-extension/release-pipeline.png)

### Things to note

- The version of the manifest and the task versions are bumped up by the tasks and then published to the marketplace.

- You can use the same extension manifest and just change the extension id in the build task to publish a private extension. The private version of my extension has the id `lighthouse-ci-canary` while the public version has `lighthouse-ci` as it's id.

- I update the patch version of the extension when I publish the private version and update the minor version when publishing the publicly available extension. The task versions are also bumped up to match the extension version.

In this blog post, I showed you the different extension points of Azure DevOps, how to build a custom build task, where you can find relevant documentation, sample tasks, and how I use Azure DevOps to continuously deploy updates to my extensions.
