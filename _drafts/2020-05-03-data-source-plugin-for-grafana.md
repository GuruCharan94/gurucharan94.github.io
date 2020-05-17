---
title: Building the Cosmos DB Data Source for Grafana
date: 2022-05-03
header:
  teaser: "/assets/images/cosmos-db-grafana.jpg"
  thumbnail:  "/assets/images/cosmos-db-grafana.jpg"
  og_image: "/assets/images/cosmos-db-grafana.jpg"
categories:
- Grafana
- Azure
tags:
- Javascript
- Cosmos DB
- Plugins
excerpt: 
# ogImage:
  # title: "**Building the Cosmos DB Data Source for Grafana**"
  # subtitle: "www.gurucharan.in | @gurucharan94"
  # filename: "cosmos-db-grafana.jpg"
  # fontSize:  "120%"
---

## What are Grafana Plugins

Grafana offers you a wide range of visualizations and data sources. If you need a special visualization type or a need to pull in data from a source that is not supported out of the box, you can extend Grafana by building plugins.

Grafana supports three types of plugins

1. Panels - A new visualization type such as world maps, pie-charts etc.

2. Data sources Plugins - Add support to visualize a new database using a panel.

3. Apps = Panel + Data Source Plugins to provide a cohesive experience.

## Building a Data Source Plugin

1. Follow this https://grafana.com/tutorials/build-a-data-source-plugin/#1
  - Link to NVM Windows Blog Post

2. Set-up env. No Link to Grafana in Azure. Use deployment slots and publish directly there using pipelines ??
  - yarn install and yarn dev

3. Take a look at plugin.json. Contains MetaData on the plugin. Module.ts is the entry point.

4. Understanding module.ts

```typescript
import { DataSourcePlugin } from '@grafana/data';
import { DataSource } from './DataSource';
import { ConfigEditor } from './ConfigEditor';
import { QueryEditor } from './QueryEditor';
import { MyQuery, MyDataSourceOptions } from './types';

export const plugin = new DataSourcePlugin<DataSource, MyQuery, MyDataSourceOptions>(DataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor);

```

- DataSourcePlugin Built-in

- DataSource - data source in Grafana must extend the `DataSourceApi` interface, which requires you to defines two methods: `query` and `testDatasource` - abstract methods in `DataSourceApi`

- 
Built a fake form for DataSource configuration.
Added a cosmos DB. Migrated some fake data to here. Connected to Cosmos..
Added health test.
