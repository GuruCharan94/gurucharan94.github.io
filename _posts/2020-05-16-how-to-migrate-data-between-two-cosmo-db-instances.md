---
title: How to migrate data between two Cosmos DB instances using PowerShell
date: 2020-05-16
image : "/assets/images/cover-images/cosmos-db-migrator-script.jpg"
header:
  teaser: "/assets/images/cover-images/cosmos-db-migrator-script.jpg"
  thumbnail:  "/assets/images/cover-images/cosmos-db-migrator-script.jpg"
  og_image: "/assets/images/cover-images/cosmos-db-migrator-script.jpg"
categories:
- PowerShell 
tags:
- Azure
- PowerShell
- CosmosDB 
excerpt: Here is a simple script I wrote to migrate data from the source database to a target instance of Azure Cosmos DB using CosmosDB Migrator

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

You can save this script in your computer. Once you execute this file, you will see logs that shows you how many records were migrated

``` txt
Transferred: 0; Failed: 0; Elapsed Time: 00:00:00
Transferred: 250; Failed: 0; Elapsed Time: 00:00:04.8250522
Transferred: 650; Failed: 0; Elapsed Time: 00:00:09.8259306
Transferred: 1050; Failed: 0; Elapsed Time: 00:00:14.8389670
Transferred: 1450; Failed: 0; Elapsed Time: 00:00:19.8393121
Transferred: 1800; Failed: 0; Elapsed Time: 00:00:24.8405494
Transferred: 2200; Failed: 0; Elapsed Time: 00:00:29.8413284
Transferred: 2600; Failed: 0; Elapsed Time: 00:00:34.8423809
Transferred: 3000; Failed: 0; Elapsed Time: 00:00:39.8551647
```

There is no value in keeping this hidden on a folder in my hard drive, is there ? So, I made it public. I am pretty sure that I will do an internet search for this later 😎. Hopefully, you will find this useful as well.

{% include ad.html %}