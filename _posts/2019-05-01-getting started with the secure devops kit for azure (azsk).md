---
title: "How to Improve Your Azure Security with the Secure DevOps Kit for Azure (AzSK)"
date: 2019-04-30
image: assets/images/AzSK/AzSK-LogAnalytics.png
header:
  teaser: assets/images/AzSK/AzSK-LogAnalytics.png
  thumbnail: assets/images/AzSK/AzSK-LogAnalytics-thumbnail.png
  og_image: assets/images/AzSK/AzSK-LogAnalytics.png
categories:
  - Azure
tags:
  - Azure
  - Security
  - Log Analytics
  - PowerShell
excerpt: "An quick guide to help you get started with the different features of the Secure DevOps Kit for Azure (AzSK) to help improve the security posture of your Azure Workloads and adopt a security first mindset."
---

[The Secure DevOps Kit for Azure (AzSK)](https://azsk.azurewebsites.net/) is a free and open source toolkit that checks your Azure resources for operational and security best practices. The kit in it's core is a Powershell Module that caters to the end to end Azure subscription and resource security needs by checking key areas like

- **Subscription Security** - ARM Policies, RBAC (Role Based Access Control), Security Center Configurations
- **Resource Security** - Https Configurations, Firewall Rules, Key Rotation, Token Expiration, Backup and Disaster Recovery Configuration and many others.

This post helps you get started with the core features of the Secure DevOps Kit by showing you how to

- Install AzSK and running your first scan
- Understand the scan results.
- Push scan results to Azure Log Analytics and visualizing scan results like below screenshot

I have further provided links to the official docs if you want to try out some of the advanced features such as

- Customizing the security checks
- Azure DevOps (VSTS) and Jenkins integrations to include these checks in your deployment pipeline.
- Continuous security monitoring post deployment.

<figure>
  <img class="lazyload" data-src="/assets/images/AzSK/AzSK-LogAnalytics.png" 
  src="/assets/images/loadingicon.gif" alt="AzSK-Log Analytics"/>
  <figcaption>AzSK-Log Analytics</figcaption>
</figure>

## **Installing AzSK and Running your First Scan**

I am assuming you, dear reader, have basic knowledge of Powershell. In case you need to get started or brush up on your Powershell, the AzSK team have done a fantastic job to help you with [this crash course](https://azsk.azurewebsites.net/Blogs/Blog1.html).

Ensure you have **PowerShell version 5** or higher installed on your machine. You can check the version of Powershell installed on your machine by running `$PSVersionTable` on your PowerShell window. Update your PowerShell version if you need to. The update is mostly straight-forward. Google is your best friend here :blush:

<figure>
  <img class="lazyload" data-src="/assets/images/AzSK/PSVersion.png"
  src="/assets/images/loadingicon.gif" alt="Powershell Version"/>
  <figcaption>Powershell Version</figcaption>
</figure>

Once you have the right version of Powershell installed the next step is that you **trust me, copy and paste scripts** into your Powershell ISE Window and run them. :blush: The scripts use the new Azure Powershell (Az) Modules extensively. I have included an overview of what the script attempts to accomplish and also in-line comments wherever necessary.

### **Copy and Paste - Drill 1**

Drill 1 involves the installation of The Secure DevOps Kit for Azure. The installation does not need admin privileges and installs the modules for the currently logged in user. The Azure Security Kit relies heavily on the new Azure Powershell (Az) Modules. You can run the below scripts to install AzSK on your machine. The installation might take some time and in the meanwhile, you can take a look at the [official setup instructions](https://azsk.azurewebsites.net/00a-Setup/Readme.html) which contains answers to frequent installation problems.

```powershell
# Install AzSK
Install-Module AzSK -Scope CurrentUser -AllowClobber -Force

# Display some info about AzSK
Get-InstalledModule AzSK

# Lists all the commands available in AzSK
Get-Help AzSK
```

### **Copy and Paste - Drill 2**

Now that AzSK is installed successfully, drill 2 involves the below script which helps us to obtain the most value from AzSK by setting up a Log Analytics Workspace to visualize the results.

The script below

- Imports AzSK into the current session
- Prompts you to login to Azure
- Creates a new Resource Group in a subscription of your choice
- It then creates a Log Analytics workspace with the AzSK visualizations
- Configures AzSK to push the scan results to the newly created workspace

Save the below script in a file called **AzSK-setup.ps1**. From your Powershell ISE window which you already have open, you can run `.\AzSK-setup.ps1 -SubscriptionName "your-subscription-name"`

```powershell
Param
(
    [Parameter(Mandatory=$true)] [string]$SubscriptionName,
    [string]$Location = "East US"
)
$RgName = "AzSK-GettingStarted-RG"

#The script requires Powershell 5 or higher. Imports AzSK in current session.
Import-Module AzSK

Connect-AzAccount

Get-AzSubscription -SubscriptionName "Visual Studio Professional" | Set-AzContext

# Check if a resource group by name "AzSK-GettingStarted-RG" exists
Get-AzResourceGroup -Name $RgName `
                         -ErrorAction SilentlyContinue `
                         -ErrorVariable rgError

if ($rgError)
{ # Resource Group Does not exists. Create a new one.
   New-AzResourceGroup -Name $RgName -Location $Location
}

#Create a Log analytics Workspace if not exists
$LogAnalyticsWorkspace = Get-AzOperationalInsightsWorkspace `
                        -ResourceGroupName $RgName | Select -First 1

if ($LogAnalyticsWorkspace.Count -eq 0)
{
    $WorkspaceName = "AZSK-log-analytics-" + (Get-Random -Maximum 99999)
    $LogAnalyticsWorkspace = New-AzOperationalInsightsWorkspace `
                                -ResourceGroupName $RgName `
                                -Name $WorkspaceName `
                                -Location $Location `
                                -Sku "standalone"
}

#Get Subscription Id
$SubscriptionId = Get-AzSubscription `
                    | Where-Object Name -eq $SubscriptionName `
                    | Select-Object Id

# Setup AzSK View in Log Analytics
Install-AzSKOMSSolution -OMSSubscriptionId $SubscriptionId.Id `
                        -OMSResourceGroup $RgName `
                        -OMSWorkspaceId  $LogAnalyticsWorkspace.CustomerId `
                        -DoNotOpenOutputFolder


$LogAnalyticsKeys = Get-AzOperationalInsightsWorkspaceSharedKeys  `
                      -ResourceGroupName $RgName `
                      -Name $LogAnalyticsWorkspace.Name `

Set-AzSKOMSSettings -OMSWorkspaceID $LogAnalyticsWorkspace.CustomerId -OMSSharedKey $LogAnalyticsKeys.PrimarySharedKey
```

### **Copy and Paste - Drill 3**

This is the fun part where we can finally scan our Azure Workloads and compare them against security best practices.

- The below script scans a subscription of your choice and all the resources inside it. Running this script shows you the real time progress of the scan results on the console. **The subscription scanned can be a different subscription to the one contains the Log Analytics Workspace.**

- The results are also summarized in CSV, PDF and Json formats in addition to pushing it to the Log Analytics workspace.

- The scan also generates fix scripts (doesn't run them) which can be used to automatically fix failing security controls.

Save the below script in a file called **AzSK-Scan.ps1**. From your Powershell ISE window which you already have open, you can run `.\AzSK-Scan.ps1 -SubscriptionName "your-subscription-name"`

```powershell
Param
(
    [Parameter(Mandatory=$true)][string]$SubscriptionName
)
Import-Module AzSK
Connect-AzAccount # Skip this in cloud shell
# Run this in a new Powershell Window after running previous script

$SubscriptionId = Get-AzSubscription `
                    | Where-Object Name -eq $SubscriptionName `
                    | Select-Object Id

# Sets Location where scan results are stored to current folder.
Set-AzSKUserPreference -OutputFolderPath (Get-Location).Path

# Scan the subscription against Security Best Practices
Get-AzSKSubscriptionSecurityStatus -SubscriptionId $SubscriptionId.Id -GeneratePDF Portrait -GenerateFixScript

# Scan the individual resources against Security Best Practices
Get-AzSKAzureServicesSecurityStatus -SubscriptionId $SubscriptionId.Id -GeneratePDF Portrait -GenerateFixScript

# Resets location where scan results are stored.
Set-AzSKUserPreference -ResetOutputFolderPath
```

## **AzSK Scan Results**

The AzSK scan results are stored inside a folder called AzSKLogs relative to the current working directory. The .csv file is a good starting point to understand the results. They contain detailed information about the controls scanned, the status, the severity and other details that are self-explanatory. **Convert this to a spread-sheet, format it as table, add your excel magic and email this to your boss.**

The fix scripts are also generated thanks to the `GenerateFixScript` argument. **Proceed with caution and test the fix scripts before running it against production workloads.**

You can head over to the Azure Portal and navigate to the Log Analytics Workspace and see that the scan results are also pushed to the Log Analytics workspace that was configured. [It usually takes around 30 minutes on your first scan for the scan results to show up in Log Analytics](https://docs.microsoft.com/en-us/azure/log-analytics/log-analytics-data-ingestion-time). The subsequent results show up much faster.

**Pro Tip :** The built-in visualization of the log analytics **shows only the baseline controls for the last 3 days**. Base line controls are the most important security controls that ensure a decent basic level of security.

To match the results in the .csv file you have to edit the workspace and specifically modify the queries across every blade and specifically remove the **`where TimeGenerated > ago(3d)`** and the **`IsBaselineControl_b == true`** parts from the query. You can also add / remove / edit the blades to customize the AzSK Solution for Log Analytics.

<figure>
  <img class="lazyload" data-src="/assets/images/AzSK/Edit-AzSK-Queries.png"
  src="/assets/images/loadingicon.gif" alt="AzSK-Edit-Queries"/>
  <figcaption>AzSK-Edit-Queries</figcaption>
</figure>

## **Advanced Features**

- **[Continuous Assurance (CA) Mode](https://azsk.azurewebsites.net/04-Continous-Assurance/Readme.html)** - This is an Azure Automation runbook that scans your subscription at a scan frequency of your choosing. This greatly help situation where systems are already live and you want to monitor the security posture continuously to avoid *security drift*.

- **[Continuous Assurance (CA) in Central Scan mode](https://azsk.azurewebsites.net/04-Continous-Assurance/Readme.html#continuous-assurance-ca---central-scan-mode)** - When you have a large number of subscriptions, you can setup **CA in Central Scan mode** which provides you the ability to monitor several target subscriptions using a single master subscription that contains the automation runbook. Configuring this can take up a couple of hours and is flaky. [Carefully follow these instructions](https://azsk.azurewebsites.net/04-Continous-Assurance/Readme.html).

- **[Customizing the Security Rules](https://azsk.azurewebsites.net/07-Customizing-AzSK-for-your-Org/Readme.html)** - AzSK also provides a possibility to customize the security controls which helps you to do things such as disable certain controls, change control severity, modify recommendation messages etc. based on your context.

- **Alerting** - Since the scan results are configured to be sent to Azure Log Analytics workspace, you can configure alerts using the Log Analytics API.

- **[CI/CD Integration with Azure DevOps and Jenkins](https://azsk.azurewebsites.net/03-Security-In-CICD/Readme.html)** - Running these security scans periodically from a PS console is great but integrating them in your CI / CD pipeline is even better. AzSK provides extensions for Azure DevOps (formerly VSTS) and Jenkins.

<figure>
  <img class="lazyload" data-src="/assets/images/AzSK/AZSK-AzureDevOps.png"
  src="/assets/images/loadingicon.gif" alt="AzSK-AzureDevOps"/>
  <figcaption>AzSK-AzureDevOps</figcaption>
</figure>

With configurable security policies, auto generated fixes, multiple results formats, CI/CD extension and out of the box Log Analytics dashboards with querying and alerting capabilities, the Secure DevOps Kit for Azure is a must have tool for teams working with Azure to adopt a security first mindset and create secure workloads on Azure.

**Did you like this?**

Please take some time to provide feedback with the reaction buttons below. If you think that something that can be better explained or done differently and better, leave a comment.

If you enjoyed this post, help spread the word by sharing this with your friends using the buttons below. **Thank you !!**