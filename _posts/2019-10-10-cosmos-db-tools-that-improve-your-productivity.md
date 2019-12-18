---
title: "Five Must Have CosmosDB tools to make you more productive"
date: 2019-10-10
header:
  teaser: "/assets/images/cosmos-tools/teaser.png"
  thumbnail: "/assets/images/cosmos-tools/teaser-thumbnail.png"
  og_image: "/assets/images/cosmos-tools/teaser.png"
categories:
  - Azure
tags:
  - CosmosDB
excerpt: "Cosmos DB tools that are a must-have to explore data, back-up, restore and anonymize the contents of your databases and calculate estimated cost of a Cosmos DB instance"
---

[Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/introduction) is Microsoft's globally distributed, multi-model, NoSQL database service. Cosmos DB enables you to elastically and independently scale throughput and storage across any number of Azure regions worldwide. Here are some of the tools that are available to make you more productive with CosmosDB.

## 1. Cosmos DB Data Migrator

Using the Cosmos DB data migrator, you can import from JSON files, CSV files, SQL, MongoDB, Azure Table storage, Amazon DynamoDB, and even Azure Cosmos DB SQL API collections into a new Cosmos DB instance. The data migrator is open-source and [available here](https://github.com/Azure/azure-documentdb-datamigrationtool). You can build it from source or head over to the releases section to download the tool.

Once you have the software set-up on your machine, you then choose where you want to import the data from. You can import data from a variety of sources such as

- Azure Tables
- JSON files
- MongoDB
- SQL Server
- CSV files
- RavenDB
- Amazon DynamoDB

{% include figure image_path="/assets/images/cosmos-tools/cosmos-data-migrator-import.png" alt="Cosmos DB Data Migrator Import" caption="Cosmos DB Data Migrator Import" %}

Next, you select how you want to export the data. You can export the data as JSON files or to CosmosDB using Sequential or Bulk Import techniques.

Finally, an important thing to remember is **the connection type** which is under advanced options. You can read about the different connection policies from the [Cosmos DB Docs](https://docs.microsoft.com/bs-latn-ba/azure/cosmos-db/performance-tips). If you are behind a corporate firewall, Gateway mode is your best bet. Hit next and wait for the data migration to finish.

{% include figure image_path="/assets/images/cosmos-tools/cosmos-data-migrator-export.png" alt="Cosmos DB Data Migrator Export" caption="Cosmos DB Data Migrator Export" %}

You can run these steps via the command-line as well. Head over to the folder where the tool was extracted, open the command line and run `dt.exe --help`. This launch the console version of the tool with useful help on usage and options on how to invoke the migrator via the command line. How nice!

``` cmd
#Import a single JSON file
dt.exe /s:JsonFile /s.Files:.\pokemons.json /t:DocumentDBBulk /t.ConnectionString:"AccountEndpoint=<CosmosDB Endpoint>;AccountKey=<CosmosDB Key>;Database=<CosmosDB Database>;" /t.Collection:Pokemons /t.CollectionThroughput:1000

```

You can find more about the CosmosDB Data Migrator [from the Microsoft docs](https://docs.microsoft.com/en-us/azure/cosmos-db/import-data).

## 2. Cosmic Clone

Cosmic Clone helps you to create of a backup of your Cosmos Collection in a few clicks and enables you to perform first of its kind data masking and anonymization tasks on Azure Cosmos DB. This one is open-source as well and you can [check this out on GitHub](https://github.com/microsoft/CosmicClone).

The stand-out features of cosmic clone is the ability to

- Create collections with similar settings(indexes, partition, TTL etc) on target instances
- Anonymize data through scrubbing or shuffling of sensitive data.

You choose the source Cosmos DB instance and the target instance, specify what you want to clone and add data handling rules and then wait for the cloning process to complete.

{% include figure image_path="/assets/images/cosmos-tools/cosmic-clone3.png" alt="Cosmic Clone Data Handling Rules" caption="Cosmic Clone Handling Rules" %}

There is no command-line options to automate this process and more importantly the [connection policy is set to TCP](https://github.com/microsoft/CosmicClone/blob/master/CosmosClone/CosmosCloneCommon/Utility/CosmosDBHelper.cs#L23) which does not play well with corporate firewalls. So, if you are behind a firewall, clone the repo, modify the policy, build and run it.

## 3. Cosmos Capacity Calculator

IMO, this should have been called cost calculator and not capacity calculator. Anyway, you can check out the calculator [here](https://cosmos.azure.com/capacitycalculator/). The estimate takes into account a lot of different factors when calculating the final cost and is more accurate when compared to [the Azure Pricing Calculator](https://azure.microsoft.com/en-in/pricing/calculator/).

When you sign-in with your email account after **ignoring the unverified warning on the sign-in page**, more form fields are available and you can specify more details about your workload to get better estimates.

The **Save Estimate** button which simply downloads a csv file and the ability to specify more advanced information is available only when you sign-in. Otherwise, the cost calculator is a useful tool to estimate costs up-front.

{% include figure image_path="/assets/images/cosmos-tools/cosmos-count-advanced.png" alt="Cosmos DB Cost Calculator" caption="Cosmos DB Cost Calculator" %}

## 4. Cosmos DB Explorer

 [Cosmos Db Explorer](https://www.bruttin.com/CosmosDbExplorer/) is the best way to explore the contents of your Cosmos DB. There are a lot of features available for you such as the ability get the query metrics and request units (RU) automatically for each query. You can even export the data in JSON format. The Cosmos DB explorer is a fanatastic piece of software to query and explore the data inside your Cosmos DB.

{% include figure image_path="/assets/images/cosmos-tools/cosmos-db-explorer.png" alt="Cosmos DB Explorer" caption="Cosmos DB Explorer" %}

You can [download the latest version here](https://github.com/sachabruttin/CosmosDbExplorer/releases) or you can go `choco install cosmosdbexplorer` if you have chocolatey installed. (You should have [chocolatey](https://chocolatey.org/) installed).

## 5. Visual Studio Code Extension for Cosmos DB

The [VS Code Extension for Cosmos DB](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb) enables you to explore the data inside Cosmos DB without having to leave your IDE. The extension features a Cosmos DB Explorer to CRUD documents, collections, databases and there is also support for Mongo Scrapbooks which allows you to run mongo commands with rich intellisense. Haven't tried the scrapbooks yet.

With these Cosmos DB tools, you can explore data, back-up, migrate and anonymize the contents of my databases and calculate the estimated cost of running a Cosmos DB instance on Azure and be more effective when working with Cosmos DB.
