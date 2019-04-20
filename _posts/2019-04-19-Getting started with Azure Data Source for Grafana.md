---
title: "Getting Started with Azure Monitor Data Source for Grafana"
categories:
  - Azure
tags:
  - Azure Monitor
  - Grafana
  - Application Insights
excerpt: "This is a complete end-to-end guide covering everything you need to know about using Azure Monitor Data Source for Grafana to monitor your Azure Resources"
---

The Azure Monitor Data Source for Grafana is a Grafana plugin for Azure which lets you consume and visualize metrics from Azure Monitor, Application Insights and Log Analytics on Grafana. In case you haven't heard, [Grafana](https://grafana.com/grafana/) is the leading open source platform for beautiful time series analytics, visualization and monitoring like the one you see below.

![Sample Grafana Dashboard](/assets/images/grafana/grafana.png "Grafana Dashboard with Azure Monitor Data Source")

I found that the Grafana visuals are flat out better than Azure Dashboards, offers a great deal of customization, looks amazing on a big screen, provides alerting integrations* via E-Mail, Slack, Microsoft Teams and PagerDuty to name a few and is easily an upgrade to your monitoring and visualization efforts. You still need to host your instance of grafana on a server and that incurs some additional and usually negligible cost whereas the Azure Dashboards are free.

*Currently, only limited alerting is possible for the Azure Data Source but this is being worked on and is expected to be fully available in the next release.

## Setting up Grafana and the Azure Data Source on an Ubuntu VM on Azure

You can install and run Grafana on Windows, Linux or Mac and there is even a docker image available if that is your thing. This post will only cover how to set this up on an Ubuntu VM in Azure. To complete the entire process, you will need enough permissions to

- Create a Ubuntu VM on Azure (duh!)
- Register an application on Azure Active Directory and provide it access to the resources (subscription / resource group / resource ) you would like to monitor.

### Step 1 : Create an Ubuntu VM on Azure

I assume that you are familiar with creating a VM on Azure and so I will not spend time explaining the steps in detail. Here is a link to the [official docs on creating a linux VM](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/quick-create-portal) in case you need it. For the purpose of this tutorial you can create a Ubuntu 18.04 LTS server on Azure, open up ports 80 (http) and 22 (ssh) and choose an appropriate size of VM that meets [the minimum system requirements](https://community.grafana.com/t/hardware-sizing-guidlines-for-grafana/3059)  to run grafana which is 255 mb RAM and a single CPU. This is the cloud, you can anyways scale up later if needed. So hit create and wait till the VM is created and in the meanwhile, go grab a coffee or something.

![Grafana VM Configuration](/assets/images/grafana/grafana-create-vm.png)

## Step 2 : Install Grafana and set-up the Azure Plugin

Now that the VM is created successfully, browse to the VM, get the IP address to connect to, fire up a terminal and ssh into the machine. Finally we are getting somewhere. Now it's time to install Grafana. As of writing, [the latest version available in 6.1.4](https://grafana.com/grafana/download?platform=linux) and you can run below commands inside your VM to install said version.

```bash
wget https://dl.grafana.com/oss/release/grafana_6.1.4_amd64.deb 
sudo dpkg -i grafana_6.1.4_amd64.deb 
```


- systemctl commands / path of config file.
- ssh and move to port 80.
- password gotcha
- create app in azure AD
- install plugin

- query
- Azure Monitor
- AI
- Log Analytics
- Convert to table. Recommend you go through the grafana docs for the ability to customize the look and feel onf the panels.
- Drill down
- Colour
- Axes, Labels and etc.

## Part two

- azure sso.
- alerting via slack with image

#- Permissions.
#- Slider Mode.
#- Variables.