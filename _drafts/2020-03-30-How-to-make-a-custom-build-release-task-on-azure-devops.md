---
title: How to make a custom build or release task on Azure DevOps
date: 2020-03-31
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

I built and published a [couple of Azure DevOps build and release tasks to the marketplace](https://marketplace.visualstudio.com/publishers/gurucharan) and this blog post highlights tips, tricks, lessons learnt along the way about developing your own custom extensions to Azure DevOps and publish them to the marketplace.

## Understanding Azure DevOps Extensions

Azure DevOps extensions are add-ons that can be used to customize and extend your DevOps experience with Azure DevOps Services. They are written with standard technologies - HTML, JavaScript, CSS - and can be developed using your preferred development tools.

There are plenty of extensibility points on Azure DevOps that let's you extend and customize. Some of the areas are

- Hubs and hub groups ( Files, Releases, Backlog, and Queries)
- Context Menus and toolbars
- Dashboards
- Work item form
- Azure Pipelines tasks and
- Service hooks

Take a look at the [official docs for a detailed explanation of the extension points](https://docs.microsoft.com/en-us/azure/devops/extend/reference/targets/overview?view=azure-devops).

## Custom Azure Pipelines Task

Although Azure DevOps offers different extensibility points, this blog post will only show details about building and publishing custom pipeline tasks on Azure DevOps. Most of the in built tasks are open source and [you can find them on GitHub](https://github.com/microsoft/azure-pipelines-tasks). I published the lighthouse task in the marketplace and [here is the source](https://github.com/GuruCharan94/azure-devops-extensions/tree/master/lighthouse-ci).

The most important building blocks of any extension are

- [The extension manifest](https://github.com/GuruCharan94/azure-devops-extensions/blob/master/lighthouse-ci/vss-extension.json) that defines how the extension is listed in the marketplace.
- [The task.json file](https://github.com/GuruCharan94/azure-devops-extensions/blob/master/lighthouse-ci/lighthouse-ci-build-task/task.json) that defines the entry point of the extension under `execution` and the user inputs to the task.
- [Actual Code that does the work](https://github.com/GuruCharan94/azure-devops-extensions/blob/master/lighthouse-ci/lighthouse-ci-build-task/src/lighthouse-ci.ts) which is in this case a TypeScript file which is compiled to JavaScript which is the entry point of the execution.

Now that the code for the extension is ready, the next step towards getting it into the Marketplace is to package the files together as VSIX 2.0 compatible .vsix files. Microsoft provides [tfx-cli](https://github.com/microsoft/tfs-cli), a cross-platform command-line interface (CLI) to package and publish your extension.

```powershell
tfx extension create --manifest-globs vss-extension.json
tfx extension publish --manifest-globs your-manifest.json --share-with yourOrganization
```

[This tutorial explains](https://docs.microsoft.com/en-us/azure/devops/extend/develop/add-build-task?view=azure-devops) the details on building a simple "Hello World" task and covers everything from setting up development environment to publishing your extension to the marketplace.

## Friends don't let friends right-click publish

While you can use the [tfx-cli](https://github.com/microsoft/tfs-cli) to publish your extensions to the marketplace, there is a better way that is automated that leverages Azure DevOps not publish from your local version.

You can use Azure DevOps to build, test, package and publish Azure DevOps extensions using a Continuous Delivery Pipeline.You can also have private, beta and public Versions of the extension using the same code and progressively roll-out these extensions to your users once you think they are ready for prime time. This is possible using the [Azure DevOps Extension Tasks](https://marketplace.visualstudio.com/items?itemName=ms-devlabs.vsts-developer-tools-build-tasks).

### How does my build and release pipelines look

The actual build steps of the Lighthouse CI task in Azure Pipelines looks includes task to

- Use a specific version of the tfx-cli
- npm install node packages
- Compile the TypeScript to JavaScript
- Package the extension into a vsix file and
- Publish a build artifact

Here is a screenshot of how the pipeline looks in Azure DevOps ![Screenshot of Build Pipeline](/assets/images/azure-devops-extension/extension-build.png)

The release pipeline has 2 environments

- Private - Any new changes including builds from pull requests are published to the marketplace as a private extension in the marketplace. The private extension is shared with my account and I test my extensions here.

- Public - Once the extension works as intended, it is deployed to be publicly available.

Here is a screenshot of the release pipeline in Azure DevOps
![Release Pipeline](/assets/images/azure-devops-extension/release-envs.png)

and this are the steps in the environments.
![Release Pipeline](/assets/images/azure-devops-extension/release-pipeline.png)

### Things to note

- The version of the manifest and the task versions are bumped up by the tasks and then published to the marketplace.

- You can use the same extension manifest and just change the extension id in the build task to publish a private extension. The private version of my extension has the id `lighthouse-ci-canary` and the public version `lighthouse-ci`.

- The private environment bumps up the patch version of the extension and the public environment bumps up the minor version. The task versions are bumped up to match the extension version.

In this blog post, I showed you the different extension points of Azure DevOps, how to build a custom build task, where you can find relevant documentation and sample tasks, and how I use Azure DevOps to continuous ly deploy updates to your extensions.

I am fairly happy with my development workflow where I am using Azure DevOps to extend Azure DevOps. Cool !! 😎😎😎😎
