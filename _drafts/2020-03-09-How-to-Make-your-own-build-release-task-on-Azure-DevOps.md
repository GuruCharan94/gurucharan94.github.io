---
title: How to make your own build or release task on Azure DevOps
date: 2020-03-09
header:
  teaser: ""
  thumbnail: ""
  og_image: ""
categories:
- AzureDevops
- BooksILove
tags:
- Culture
- People
- RemoteWork
- Life
excerpt: 
---

## The many ways of extending Azure Devops - Task / UI / etc

- Link to MSFT docs
- Sample Code / Task
- If they are too complex for you liking, check if your favorite task in Azure Devops is open source and look at it's source code.

I built a couple of extension and published them to the Marketplace

## Basic Building Block of a custom build task

- extension manifest
- task.json
- nodejs code to actually do stuff.

Now that coding is completed, you need to actually build and deploy to the marketplace.

## Using Azure Devops to build you Azure Devops Extension

You can use Azure Devops to build and deploy your extension to the marketplace. Azure Devops meets Azure DevOps. Pretty Cool , uh ?

- MEME - JOEY
- Link to the marketplace extension.
- Show the sample pipeline.
- Any caveats / tips

## Progressive Roll-out using Release Management

You have roll-out updates to ur extension in a progressive manner.
- Private / Canary (Beta) / Public
- GUID can be same
- Pipeline Sample
