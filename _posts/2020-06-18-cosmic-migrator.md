---
title: How to migrate data between two Cosmos DB instances using PowerShell
date: 2020-05-16
header:
  teaser: "/assets/images/cosmos-db-migrator-script.jpg"
  thumbnail:  "/assets/images/cosmos-db-migrator-script.jpg"
  og_image: "/assets/images/cosmos-db-migrator-script.jpg"
categories:
- PowerShell 
tags:
- Azure
- PowerShell
- CosmosDB 
excerpt: 
ogImage:
  title: "**How to migrate data between two Cosmos DB instances using PowerShell**"
  subtitle: "www.gurucharan.in | @gurucharan94"
  filename: "cosmos-db-migrator-script"
  fontSize:  "120%"
---

I have previously written about [Cosmos DB utility tools that you cannot miss](https://www.gurucharan.in/azure/cosmos-db-tools-that-improve-your-productivity/). Cosmos DB Data Migrator is the one I use most if I have to move data around across multiple instances of CosmosDB. Here is a simple script I wrote to migrate data from the source database to a target instance of Azure Cosmos DB.

```powershell

$cosmosCollections = @(
  "collection1",
  "collection2",
  "yetanothercollection",
  "ThisIsTheLastOneIPromise"
  );

### Settings for Prod
$sourceConnectionString = "AccountEndpoint=<sourceendpoint>;AccountKey=<sourcekey>;Database=<sourcedatabase>"
$targetConnectionString = "AccountEndpoint=<targetendpoint>;AccountKey=<targetkey>;Database=<targetdatabase>"

$timestamp = Get-Date -Format "MM-dd-yyyy-HH-mm-ss"

foreach ($collection in $cosmosCollections)
{
  Write-Host "Starting Migration of $collection"
  $file = "./migration-$timestamp-$collection.log"
  Start-Process -Wait -NoNewWindow -RedirectStandardOutput $file -FilePath "\path\to\executable\dt.exe" `
                -ArgumentList "/ProgressUpdateInterval:00:00:05 /s:DocumentDB /s.Collection:$collection /s.ConnectionString:$sourceConnectionString /s.InternalFields /t:DocumentDBBulk /t.DisableIdGeneration /t.Collection:$collection /t.ConnectionString:$targetConnectionString"

  Write-Host "End Migration of $collection"
}
```

There is no value in keeping this hidden on a folder in my hard drive, is there ? So, I made it public so that I can do an internet search myself later 😎 and hopefully will find this useful as well.