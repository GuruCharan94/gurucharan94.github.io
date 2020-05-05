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

[Building the Cosmos Data Source for Grafana](https://grafana.com/tutorials/build-a-data-source-plugin/#1)

## Preparation

- Update to Grafana 7.0.
  - I have Grafana deployed on App Service. Update the docker image on the deployment slot. Easy.
  - Link to previous blogs.

- NodeJS and Yarn. See https://www.gurucharan.in/web/javascript/node/how-to-install-node-nvm-yarn-on-windows/

## Getting Started

Run this command npx @grafana/toolkit plugin:create my-grafana-plugin

Grafana Toolkit installation

plugin.json

https://grafana.com/docs/grafana/latest/plugins/developing/plugin.json/
