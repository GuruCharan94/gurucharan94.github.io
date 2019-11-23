---
title: Adding Azure Devops Deployment Annotations to Grafana
date: 2019-11-20 18:30:00 +0000
header:
  teaser: ''
  thumbnail: ''
  og_image: ''
  image: ''
categories:
- azure devops
- grafana
tags:
- grafana
- azure devops
- devops
- azure
excerpt: ''

---
If you are new to Azure integrations on Grafana, you should read my blog posts on configuring [Azure Monitor Data Source for Grafana](https://www.gurucharan.in/azure/up-your-azure-monitoring-game-with-azure-data-source-for-grafana/) and [running Grafana using Azure Web App for Containers](https://www.gurucharan.in/azure/running-grafana-on-azure-app-service/).

This blog post shows you how to add rich information from Azure Devops deployments inside your Grafana time-series charts.

From the [Grafana docs](https://grafana.com/docs/reference/annotations/), annotations provide a way to mark points on the graph with rich events. When you hover over an annotation you can get event description and event tags. The text field can include links to other systems with more detail. 

How to configure Azure Devops annotations 