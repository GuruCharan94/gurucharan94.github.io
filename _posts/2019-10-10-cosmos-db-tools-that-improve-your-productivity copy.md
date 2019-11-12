---
title: "Five CosmosDB tools that make you productive"
date: 2019-10-10
header:
  teaser: "/assets/images/cosmos-tools/teaser.png"
  thumbnail: "/assets/images/cosmos-tools/teaser.png"
  og_image: "/assets/images/cosmos-tools/teaser-thumbnail.png"
  image: "/assets/images/cosmos-tools/teaser.png"
categories:
  - Azure
tags:
  - Azure CosmosDB
excerpt: "I share some Cosmos DB tools that you can use to explore data, migrate content, back-up and anonymize the contents of your databases, calculate estimated cost of running a Cosmos DB instance on Azure and be more productive with Cosmos DB."
---

[Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/introduction) is Microsoft's globally distributed, multi-model, NoSQL database service. Cosmos DB enables you to elastically and independently scale throughput and storage across any number of Azure regions worldwide. Here are some of the tools that are available to make you more productive with CosmosDB.

## 1. Cosmos DB Data Migrator

Using the Cosmos DB data migrator, you can import from JSON files, CSV files, SQL, MongoDB, Azure Table storage, Amazon DynamoDB, and even Azure Cosmos DB SQL API collections into a new Cosmos DB instance. The data migrator is open-source and [available here](https://github.com/Azure/azure-documentdb-datamigrationtool). You can build it from source or head over to the releases section to download the tool.

You specify where you want to import the data from

{% include figure image_path="/assets/images/cosmos-tools/cosmos-data-migrator-import.png" alt="Cosmos DB Data Migrator Import" caption="Cosmos DB Data Migrator Import" %}

You then specify how you want to export the data and more importantly the connection type which is under advanced options. You can read about the different connection policies from the [Cosmos DB Docs](https://docs.microsoft.com/bs-latn-ba/azure/cosmos-db/performance-tips). If you are behind a corporate firewall, Gateway mode is your best bet. Hit next and wait for the data migration to finish.

{% include figure image_path="/assets/images/cosmos-tools/cosmos-data-migrator-export.png" alt="Cosmos DB Data Migrator Export" caption="Cosmos DB Data Migrator Export" %}

You can automate these steps via the command-line as well. Head over to the folder where the tool was extracted, open the command line and run `dt.exe --help`. This launch the console version of the tool with useful help on usage and options on how to invoke the migrator via the command line. Great for automation.

## 2. Cosmic Clone

Cosmic Clone helps in creation of a backup copy of your Cosmos Collection in few clicks and provides options to perform first of its kind data masking and anonymization tasks on Azure Cosmos DB. This one is open-source as well and you can [check this out on GitHub](https://github.com/microsoft/CosmicClone). The stand-out features of cosmic clone is the ability to

- Create collections with similar settings(indexes, partition, TTL etc) on target instances
- Anonymize data through scrubbing or shuffling of sensitive data.

You choose the source Cosmos DB instance and the target instance, specify what you want to clone and add data handling rules and then wait for the cloning process to complete.

{% include figure image_path="/assets/images/cosmos-tools/cosmic-clone3.png" alt="Cosmic Clone Data Handling Rules" caption="Cosmic Clone Handling Rules" %}

There is no command-line options to automate this process and more importantly the [connection policy is set to TCP](https://github.com/microsoft/CosmicClone/blob/master/CosmosClone/CosmosCloneCommon/Utility/CosmosDBHelper.cs#L23) which does not play well with corporate firewalls. So, if you are behind a firewall, clone the repo, modify the policy, build and run it.

## 3. Cosmos Capacity Calculator

This should have been called cost calculator and not capacity calculator. Anyway, you can check out the calculator [at this website](https://cosmos.azure.com/capacitycalculator/). The estimate takes into account a lot of different factors when calculating the final cost.

When you sign-in with your email account after **ignoring the unverified warning on the sign-in page**, more form fields are available and you can specify more details about your workload to get better, more accurate estimates.

{% include figure image_path="/assets/images/cosmos-tools/cosmos-count-advanced.png" alt="Cosmos DB Cost Calculator" caption="Cosmos DB Cost Calculator" %}

The **Save Estimate** button just downloads a csv file. I don't understand why the save estimate button and the ability to specify advanced information is available only when you sign-in. Seriously, What am I missing here ? Otherwise, the cost calculator is a useful tool to estimate costs up-front.

## 4. Cosmos DB Explorer

I like the Azure Storage Explorer. I can browse the contents of your Azure Storage Accounts, Disks and Cosmos DB instances. But for some reason, I couldn't get it to play nice with proxy settings at work. It would always fail with a 403 error. I was able to access my storage accounts without any issues.

{% include figure image_path="/assets/images/cosmos-tools/cosmos-storage-explorer.png" alt="Cosmos DB Errors with Storage Explorer" caption="Cosmos DB errors with Storage Explorer" %}

I googled around like any good developer and found [Cosmos Db Explorer](https://www.bruttin.com/CosmosDbExplorer/). You can head to the [releases section of their github repo](https://github.com/sachabruttin/CosmosDbExplorer/releases) and download the latest version or you can `choco install cosmosdbexplorer` if you have chocolatey installed.

## 5. Visual Studio Code Extension for Cosmos DB

Nothing beats not having to leave your IDE. The [VS Code Extension for Cosmos DB](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb) enables you to do just that. The extension features a Cosmos DB Explorer to CRUD documents, collections, databases. There is support for Mongo Scrapbooks which allows you to run mongo commands with rich intellisense. Haven't tried the scrapbooks yet.

These are my favourite Cosmos DB tools. With these tools, I can explore my data, migrate data, back-up and anonymize the contents of my databases and calculate the estimated cost of running a Cosmos DB instance on Azure.
