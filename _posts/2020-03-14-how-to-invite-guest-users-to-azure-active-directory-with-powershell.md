---
title: How to Invite Guest Users in Azure Active Directory using PowerShell
date: 2020-03-14
image: "/assets/images/guest-user-powershell.png"
header:
  teaser: "/assets/images/guest-user-powershell-cover.png"
  thumbnail: "/assets/images/guest-user-powershell-cover.png"
  og_image: "/assets/images/guest-user-powershell-cover.png"
categories:
- Azure
- PowerShell
tags:
- PowerShell
- Active Directory
excerpt: You can invite guest users on your tenant using Azure Active Directory B2B collaboration. This blog post shows you how to invite a list of users as guests to your Azure Active Directory programmatically using PowerShell, customize the invitation message and configure a redirect URL.
---

You can invite guest users on your tenant using Azure Active Directory B2B collaboration. This blog post shows you how to invite a list of users as guests to your Azure Active Directory programmatically using PowerShell, customize the invitation message and configure a redirect URL.

## Installation of AzurePowerShell Modules

Make sure that you have the Azure AD PowerShell for Graph module (AzureADPreview) installed on your machine. Execute the below commands to check if they are already installed and to install them if they are not already installed.

```powershell
Get-Module -ListAvailable AzureAD*
Import-Module -Name AzureADPreview
Get-Command -Module AzureADPreview
```

![Screenshot of AzureAD Preview PowerShell Module](/assets/images/guest-user-powershell.png)

This is a screenshot of how the results look like. I have the `2.0.1.11` version installed. In case you have the `AzureAD` module or older versions of the `AzureADPreview` module installed, check out [the docs on how to proceed with the installation](https://docs.microsoft.com/en-us/azure/active-directory/b2b/b2b-quickstart-invite-powershell).

## Show me the Code !!!

Once you have the right PowerShell modules installed, you can go ahead and invite the users using the script below.

The script allows you to

- Customize the invitation message
- Specify a Redirect URL

```powershell
$invitationMessageBody = @"
This is where you enter your custom invitation message.

This can be a multiline message with line breaks.
"@

$invitation = @{ customizedMessageBody = $invitationMessageBody }

Connect-AzureAD -TenantId "your-azure-active-directory-tenant-id"

$users = @("Populate", "your", "list", "of", "emails", "from", "excel", "or", "however", "you", "see", "fit");

For ($i = 0; $i -lt $users.Count; $i++) {

    $currentEmail = $users[$i];

        if ((Get-AzureADUser -SearchString $currentEmail).Length -le 0) {  # User not in AD. Send invite
            New-AzureADMSInvitation -InvitedUserEmailAddress $currentEmail -SendInvitationMessage $true `
                                      -InvitedUserMessageInfo $invitation -InviteRedirectUrl "https://www.my-super-fancy-app.com"
        }
}
```

Using this small script, you can connect to Azure AD and invite new users to the tenant using the Azure Active Directory B2B collaboration via PowerShell.

Cheers 😊😊😊
