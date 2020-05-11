---
title: Restart A Service Fabric Application Replica using PowerShell
date: 2020-06-10
header:
  teaser: "/assets/images/sf-restart-powershell.jpg"
  thumbnail:  "/assets/images/sf-restart-powershell.jpg"
  og_image: "/assets/images/sf-restart-powershell.jpg"
categories:
- category 
tags:
- category 
excerpt: 
ogImage:
  title: "**Restart A Service Fabric Application Replica using PowerShell**"
  subtitle: "www.gurucharan.in | @gurucharan94"
  filename: "sf-restart-powershell"
  fontSize:  "120%"
---

Here is a PowerShell script to restart replicas where specific applications / services are deployed to.

```powershell

Connect-ServiceFabricCluster -ConnectionEndpoint <domain-without-https.com:19000> `
-KeepAliveIntervalInSec 10 -AzureActiveDirectory -ServerCertThumbprint <thumbprint>

$nodes = Get-ServiceFabricNode

For ($i = 0; $i -lt $nodes.Count; $i++) {

    $result =  Get-ServiceFabricDeployedReplica -NodeName $nodes[$i].NodeName -ApplicationName fabric:<appName> `
                | Where-Object ServiceName -eq fabric:<serviceName> | Select-Object -Property ReplicaId, Partitionid

    For ($j = 0; $j -lt $result.Count; $j++) {
        Write-Host $nodes[$i].NodeName $result[$j].Partitionid $result[$j].ReplicaId
        Restart-ServiceFabricReplica -NodeName  $nodes[$i].NodeName -PartitionId $result[$j].Partitionid -ReplicaOrInstanceId $result[$j].ReplicaId
    }
}

```
