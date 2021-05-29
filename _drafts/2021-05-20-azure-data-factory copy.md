---
title: Azure Data Explorer | Tutorial and Important Concepts
date: 2020-06-10
image : "/assets/images/cover-images/sf-restart-powershell.jpg"
header:
  teaser: "/assets/images/cover-images/sf-restart-powershell.jpg"
  thumbnail:  "/assets/images/cover-images/sf-restart-powershell-thumbnail.jpg"
  og_image: "/assets/images/cover-images/sf-restart-powershell.jpg"
categories:
- Azure
tags:
- Azure
- Analytics
- Data

excerpt: 
---

## What is Azure Data Explorer ?

## Core Concepts of Azure Data Explorer

- RBAC
- Analytics DB
- Databases, Tables. Schema, no ACID properties
- purge, edit kashtam

At the top (cluster) level there is a collection of databases;
• Each database contains a collection of tables and stored functions;
• Each table defines a schema (ordered list of typed fields);
• There are various policy objects that control authorization, data retention, data encoding and other 
aspects; these can be attached to a database, a table and sometimes to a table field.

Some common query operators:
• where - filters the source by applying the specified predicate
• extend – computes and adds a new field to the source records
• summarize – computes a number of aggregate functions for each distinct group of records that 
belong to the same key
• join - merges the rows of two tables to form a new table by matching values of the specified 
column(s) from each table. Supports common join flavors (inner-, outer-, semi-, etc.)
• union - takes two or more tables and returns the rows of all of them

Ingesting 

Parition Policy

Update Policy

Rich EcoSystem 

Advanced Querying and Analytics

https://evedataexplorer.blob.core.windows.net/adxexport;lAvkQ1BFbXn2LQM+qXTIR/MstXjOhgOk+C1nn3DfZk5pmd1fhVT+YlRhKPRF4gBKu0msu+9nhqqZj3+8xxEQAw==

- Linked Services
- DataSets
- Activities
- Pipeline
- Triggers
- Data Flow

