---
title: Annotate Grafana Dashboards with Deployment Details from Azure Pipelines
date: 2019-11-23
draft: true
header:
  teaser: '/assets/images/grafana-azure-devops/teaser.png'
  thumbnail: '/assets/images/grafana-azure-devops/teaser-thumbnail.png'
  og_image: '/assets/images/grafana-azure-devops/teaser.png'
  image: '/assets/images/grafana-azure-devops/teaser.png'
categories:
- azure devops
- grafana
tags:
- grafana
- azure devops
- devops
- azure
- pipelines
excerpt: 'A complete guide on how to annotate Grafana Dashboards with rich information about your deployments in Azure Pipelines. This feature is extremely useful in situations where your production environment metrics begins to act strange and you have to decide if a recent deployment may have played a role.'

---
This blog post shows you how to add rich information from your Azure Devops deployments inside your Grafana time-series charts.

{% include figure image_path="/assets/images/grafana-azure-devops/deployment-annotation.png" alt="Azure Devops meets Grafana Annotations" caption="Azure Devops meets Grafana Annotations" %}

If you are new to Azure integrations on Grafana, you should read my blog posts on configuring [Azure Monitor Data Source for Grafana](https://www.gurucharan.in/azure/up-your-azure-monitoring-game-with-azure-data-source-for-grafana/) and how to[run Grafana using Azure Web App for Containers](https://www.gurucharan.in/azure/running-grafana-on-azure-app-service/).

## Grafana Annotations

From the [Grafana docs](https://grafana.com/docs/reference/annotations/), annotations provide a way to mark points on the graph with rich events. When you hover over an annotation you can get event description and event tags. The text field can include links to other systems with more detail. To add an annotation, you simply **Ctrl + Click** or **Ctrl + Select a region** on the graph panel.

Now that we have covered the basics of annotations, we can look at how to depict deployments in Azure Devops with rich details inside Grafana. Azure Devops has built-in integration with Grafana and it is fairly simple to configure and consume. Head over to the project settings page and click on Service Hooks. You can add a new service hook and you should have an option to add a Grafana integration.

{% include figure image_path="/assets/images/grafana-azure-devops/grafana-annotation-1.png" alt="Adding Grafana Service Hooks on Azure Devops - Step 1" caption="Adding Grafana Service Hooks on Azure Devops - Step 1" %}

*If the Grafana option does not show up, try refreshing a couple of times. The new UI for Service Hooks has some bugs.*

{% include figure image_path="/assets/images/grafana-azure-devops/grafana-404.png" alt="Grafana option missing on Azure Devops" caption="Grafana Option missing on Azure Devops" %}

After choosing Grafana, you can see that the service hook can be triggered whenever a deployment to a stage in the release pipeline completes. If you continue on the configuration page, you can choose your pipeline, stage and deployment status for which you need the service hook to trigger.

{% include figure image_path="/assets/images/grafana-azure-devops/grafana-annotation-2.png" alt="Adding Grafana Service Hooks on Azure Devops -Step 2" caption="Adding Grafana Service Hooks on Azure Devops - Step 2" %}

Then you continue to the final page of the configuration steps and enter appropriate tags, enter your Grafana URL and API token. You can then test the configuration and finally hit save.

{% include figure image_path="/assets/images/grafana-azure-devops/grafana-annotation-3.png" alt="Adding Grafana Service Hooks on Azure Devops -Step 3" caption="Adding Grafana Service Hooks on Azure Devops - Step 3" %}

The last thing you have to do to get the annotations to show up in your graph panels is head to your instance of Grafana and open dashboard settings. You can choose an appropriate colour for your annotation markers and filter what tags show up in your dashboards. Here is a screenshot of a sample configuration.

{% include figure image_path="/assets/images/grafana-azure-devops/grafana-annotation-3.png" alt="Adding Grafana Service Hooks on Azure Devops -Step 3" caption="Adding Grafana Service Hooks on Azure Devops - Step 3" %}

Now, the next time a deployment occurs on the configured pipeline, you should see a nice marker with rich data that you can trace back to your deployments inside Azure Devops. This is very useful in situations where your production environment metrics begins to act strange and you have to decide if a recent deployment may have played a role without having to search for information in multiple places.

{% include figure image_path="/assets/images/grafana-azure-devops/deployment-annotation.png" alt="Azure Devops Deployment Annotations" caption="Azure Devops Deployment Annotations" %}