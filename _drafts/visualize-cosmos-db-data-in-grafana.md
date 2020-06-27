---
title: Visualize Real-time IoT Data in Azure Cosmos DB using Grafana and Azure Data Explorer
date: 2020-06-22
image : "/assets/images/filename.jpg"
header:
  teaser: "/assets/images/filename.jpg"
  thumbnail:  "/assets/images/filename.jpg"
  og_image: "/assets/images/filename.jpg"
categories:
- category 
tags:
- Azure
- CosmosDB
- Grafana
- AzureDataExplorer 
excerpt: 
---

## What is the problem statement ?

- I have an IoT system generating a LOT of data that I have currently stored in Azure Cosmos DB.
- I need to report, perform some sort of analytics and do basic visualization of the data.
- Running aggregation queries when 3M records are generated per month is not a very wise option. Add the fact that I might have to do some joins on other tables makes it even more hard.

https://docs.microsoft.com/en-us/azure/cosmos-db/analytical-store-introduction

If your dataset grows large, complex analytical queries can be expensive in terms of provisioned throughput on the data stored in this format.High consumption of provisioned throughput in turn, impacts the performance of transactional workloads that are used by your real-time applications and services.

## Comparing ETL Options

Azure Synapse Links looks an interesting option. But the docs suggest that currently you can enable analytical store for new containers (both in new and existing accounts). So with a lot of historic data this doesn't seem an option at least for now.

So, I have to go the traditional ETL way. You extract the data, transform it and load into a different store for analytics purposes. I was looking at the offerings on Azure and found Azure Data Explorer a very practical solution.

## Azure Data Explorer (Separate Blog Post ??)

- RBAC
- Pricing

- Tables
- Schema with Sample Data
- Loading Data
  
## Ingesting Data from Cosmos DB to Azure Data Explorer

I have multiple collections.

- Multiple Collections with some of them containing device metadata. So, I export into a storage account.

- So, if the data size is larger than 1 GB, then the easiest way to import the data is using multiple batches.

## Load Real-time Data in Azure Data Explorer

- So far, so good. I have a way to load historic data into Azure Data Explorer.
- How do I get real-time data. I can try to convince those pesky devs to make changes to the application to ingest data into Azure Data Explorer but I have a better solution. The Change Feed Processor.

Some Code here.

## Integration With Grafana

- I am a big fan of the Azure Monitor Data Source for Grafana. Now, I can look at my device data in the same portal as my Azure Metrics is nice. I know Kusto Query Language and everything should be rainbows and sunshine.