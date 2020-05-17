---
title: "Applying Blue / Green Deployment concepts to migrate / upgrade Azure Event Hubs"
date: 2019-07-02
image: "/assets/images/event-hub-migration/teaser.png"
header:
  og_image: "/assets/images/event-hub-migration/teaser.png"
  teaser: "/assets/images/event-hub-migration/teaser.png"
  thumbnail: "/assets/images/event-hub-migration/teaser-thumbnail.png"
categories:
  - Azure
tags:
  - Azure Event Hub
  - High Availability
  - Migration
excerpt: "How to upgrade / migrate to new event hub when you want to change partition count and / or utilize availability zones using the blue / green deployment strategy."
---

[Azure Event Hub](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-about) is a **scalable** event processing service that ingests and processes large volumes of events and data, with low latency and **high reliability**. After you collect data into Event Hubs, you can store the data or [transform it using a real-time analytics provider](https://docs.microsoft.com/en-us/azure/data-explorer/ingest-data-event-hub). This large-scale event collection and processing capability is a key part of modern applications.

## Key Concepts

- The Event Publisher sends events to event hub. This could be telemetry data / IoT data etc.
- The Event Hub ingests the data and makes it available for the consumer.
- The Event Consumer processes the data and sends it to downstream systems.
- **Event Publisher :arrow_right: Event Hub :arrow_right: Event Consumer**

**Throughput units (TU)** define the amount of data that an Event Hub can ingest. A single throughput allows

- Ingress of up to 1 MB per second or 1000 events per second (whichever comes first) and
- Egress of Up to 2 MB per second or 4096 events per second.

Throughput units can be scaled up / down manually or you can use the **Auto-inflate** feature of Event Hubs to automatically scale up the number of throughput units.

**Partition** is an ordered sequence of events that is held in an event hub and determines your downstream parallelism. While the number of partitions does not affect your cost, it is not possible to change this configuration after creation. Here is detailed docs explaining the [scalability concepts of Event Hubs](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-scalability).

[**Availability Zones** are generally available in Event Hubs](https://azure.microsoft.com/en-us/blog/azure-service-bus-and-azure-event-hubs-expand-availability/) as of Jan 2019. It is a simple case of specifying `"properties": { "zoneRedundant": true }` in your ARM Templates. While it does not cost you extra, there is one big catch. **Availability Zones will not work with existing Event Hubs and you will need to provision new ones to use this feature.** Hmm.....

## Migrating to new Event Hub

I was looking at options to migrate to a new Event Hub with Availability Zones and/or different partition count and decided to do something along the lines of a [Blue / Green Deployment](https://docs.cloudfoundry.org/devguide/deploy-apps/blue-green.html).

<figure>
  <img class="lazyload" data-src="/assets/images/event-hub-migration/event-hub-migration-availability-zone.png"
  src="/assets/images/loadingicon.gif" alt="Migrating to a new Event Hub with Availability Zone"/>
  <figcaption>Migrating to a new Event Hub with Availability Zone</figcaption>
</figure>

### Steps

1. Create a new Event Hub with Availability Zones and desired partition count.

2. Point the Event Producer(s) to the new Event Hub.
   - This could mean something like updating settings in Key Vault and Restarting Web Apps / Functions / Service Fabric Code Packages depending on what the event producer is.

3. Monitor the metrics for the old Event Hub. Ensure incoming messages are drained and that all messages have been processed by the consumer.

4. The new Event Hub should now have messages and you can verify that again using Event Hub's metrics.

5. Update the consumer to process messages from the new Event Hub.

### Metrics is Key

Grafana is quickly becoming [my default choice of visualization platform](https://www.gurucharan.in/azure/up-your-azure-monitoring-game-with-azure-data-source-for-grafana/) over Azure Dashboards and the beautiful charts like below shows why.

<figure>
  <img class="lazyload" data-src="/assets/images/event-hub-migration/azure-event-hub-grafana-charts.png"
  src="/assets/images/loadingicon.gif" alt="Incoming & Outgoing Messages in Event Hub"/>
  <figcaption>Incoming & Outgoing Messages in Event Hub</figcaption>
</figure>

The blue bars represent the old event hub and the green bars represent the new ones. The red box around 07:15 is when the migration started and it went very smooth.
