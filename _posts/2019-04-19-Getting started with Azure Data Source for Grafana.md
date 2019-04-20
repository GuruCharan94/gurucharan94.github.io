---
title: "Getting Started with Azure Monitor Data Source for Grafana"
categories:
  - Azure
tags:
  - Azure Monitor
  - Grafana
  - Application Insights
excerpt: "This is a complete end-to-end guide covering everything you need to know about using Grafana to visualize and monitor your Azure resources with the Azure Monitor Data Source for Grafana"
---

The Azure Monitor Data Source for Grafana is a Grafana plugin for Azure which lets you consume and visualize metrics from Azure Monitor, Application Insights and Log Analytics on Grafana. In case you haven't heard, [Grafana](https://grafana.com/) is the leading open source platform for beautiful time series analytics, visualization and monitoring.

![alt text](/assets/images/grafana.png "Logo Title Text 1")

For starters, if you were using the Azure Dashboards, you would know that it offers very little in terms of customization and leaves a lot to be desired for.I feel that the Grafana visuals are flat out better, offers a great deal of customization, looks amazing on a big screen, offers alert integrations* via E-Mail, Slack, Microsoft Teams and PagerDuty to name a few and is easily an upgrade to your monitoring and visualization efforts. You still need to host your instance of grafana on a server and that incurs some additional and usually negligible cost whereas the Azure Dashboards are free.

*Currently, only limited alerting is possible for Azure Data Source but this is being worked on and should be fully available in the next release.

## 0.1. Can you show me how to setup Grafana and the Azure Plugin ?

I can say the same about the altering integrations as well. (The alerting integration for Azure Data Source Plugin is currently being worked upon for Application Insights and Log Analytics and is expected to be shipped in the next release)
