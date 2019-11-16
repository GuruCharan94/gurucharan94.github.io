---
title: "Benefits of Setting up Grafana on Azure Web App for Containers"
date: 2019-09-20
header:
  teaser: "/assets/images/grafana/grafana-containers.jpg"
  thumbnail: "/assets/images/grafana/grafana-containers-thumbnail.jpg"
  og_image: "/assets/images/grafana/grafana-containers.jpg"
  image: "/assets/images/grafana/grafana-containers.jpg"
categories:
  - Azure
tags:
  - Azure App Service
  - Grafana
  - Containers
  - High Availability
excerpt: "This post explains setting Up Grafana with Azure Web App For Containers and the benefits over an IaaS approach such as deployment slots, out of the box https and reduced overhead of maintenance."
---

I have [already written showing my excitement for the Azure Data Source for Grafana](https://www.gurucharan.in/azure/up-your-azure-monitoring-game-with-azure-data-source-for-grafana/). With alerting now **fully** supported from Grafana v6.5 onwards, I think the plugin is ready to be used to monitor production workloads in Azure. While installing Grafana on a single Virtual Machines on it is the easiest way to get started, that is not exactly setup configured for high availability.

From the [Grafana docs](https://grafana.com/docs/tutorials/ha_setup/),

> Setting up Grafana for high availability is fairly simple. You just need a shared database for storing dashboard, users, and other persistent data. So the default embedded SQLite database will not work, you will have to switch to MySQL or Postgres.

While I could get the [Bitnami Multi-Tier Grafana MarketPlace Setup for Azure](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/bitnami.multi-tier-manageddb-grafana?tab=Overview) to work, I found that this was a bit of an overkill for me. I have 2 Virtual Machine's inside an availability set, an Application Gateway that is expensive (why not a simple load balancer ?) and **no https** out-of-the-box and a dedicated MySQL Database.

Having been a Azure PaaS person, this didn't really click for me. Especially the no https by default and the management overhead of the Virtual Machines.

I knew grafana had a docker image available and so I began to wonder if I can run Grafana on Azure Web App for Containers. [Someone already did it, as always](https://www.phillipsj.net/posts/an-easy-grafana-setup-using-azure-app-service-for-linux/). The system is really simple

1. Run Grafana Image on Azure Web App for Containers
2. Point `/var/lib/grafana` to a Globally Redundant Storage Account mounted on Web App

This is an nice setup and I like it because the Paas Model of Azure App Service means less managment for me. Also, I can create deployment slots and run a nightly build of grafana from the [grafana-dev repository on Docker Hub](https://hub.docker.com/r/grafana/grafana-dev). I can try out newer features and check if the newer version works for us and upgrade safely by swapping slots.

Then I also get HTTPS. OUT-OF-THE-BOX.

Also, the Globally Redundant Storage houses the SQLite database at half the price of a full fledged SQL Database. Grafana doesn't store data locally and needs the database only for storing dashboards and users information which is not a lot of data and I think a shared SQLite is good enough. I can, of course improve the setup even more by mounting the same storage account on another App Service running on a geo-paired region and having a traffic manager doing its magic.

Unfortunately, there is [no ARM Template support for Mounting Storage Account on App Service](https://github.com/MicrosoftDocs/azure-docs/issues/34772) as of writing and so I have to use either the bash or powershell approach.

I have to ensure that the scripts are idempotent. A fancy way of saying let's add if-else to ensure the scripts don't fail when I run a second time. Looks nice for now and I am happy with the final set-up.
