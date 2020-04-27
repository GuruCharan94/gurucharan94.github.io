---
title: How to Invite Guest Users in Azure Active Directory using Azure Logic Apps
date: 2020-04-27
header:
  teaser: "/assets/images/guest-user-email.png"
  thumbnail: "/assets/images/guest-user-email.png"
  og_image: "/assets/images/guest-user-email.png"
categories:
- Azure
- Logic App
tags:
- Logic App
- Active Directory
excerpt: You can invite guest users on your tenant using the Azure Active Directory B2B collaboration. This blog post shows you how to invite guest users using Azure Logic Apps.
---

You can invite guest users on your tenant using the Azure Active Directory B2B collaboration. This blog post shows you how to invite guest users using Azure Logic Apps by invoking the `/invitation` endpoint from the Microsoft Graph API.

[Azure Logic Apps](https://docs.microsoft.com/en-us/azure/logic-apps/logic-apps-overview) is a cloud service that helps you schedule, automate, and orchestrate tasks, business processes, and workflows when you need to integrate apps, data, systems, and services across enterprises or organizations.

## Microsoft Graph Endpoint for Invitations

From the [Graph Endpoint docs](https://docs.microsoft.com/en-us/graph/api/invitation-post?view=graph-rest-1.0&tabs=http), you can send a `HTTP POST` request to `https://graph.microsoft.com/v1.0/invitations` to invite a guest user to the organization.

The request body looks like the below json.

```json
{
    "inviteRedirectUrl": "https://myapplication.com",
    "invitedUserDisplayName": "Gurucharan",
    "invitedUserEmailAddress": "youremail.com",
    "invitedUserMessageInfo": {
        "customizedMessageBody": "Custom invitation message 👍👍👍"
    },
    "sendInvitationMessage": true
}
```

You also need to send a Bearer token in your header. To obtain a bearer token, you have to register an application in the Active Directory. You can follow the below steps to do so.

## Registering an Application in the Active Directory

1. You need to [register an application](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal) in the Azure Active Directory as an "Azure AD only single-tenant" app so that this app is available only for users in this directory.

2. Ensure the registered app has the `User.Invite.All` permission configured under Application permission and consent is also provided.
![Azure AD Permissions and Consent](/assets/images/guest-user-ad-permissions.png)

3. Then take note of the registered application's
   - ApplicationID
   - TenantID or DirectoryID
   - Password / Secret Key

Now that we have the app registration part completed, we can create a logic app where we will invite a guest user.

## Azure Logic App Configuration

Create a new logic app in Azure and once it is created, use the designer to create a workflow that looks like below and click save.

![Logic App to invite guest user](/assets/images/guest-user-logic-apps.png)

The logic app makes a call to the rest endpoint every hour and obtains a bearer token using the Client Credentials flow. The OAuth 2.0 client credentials grant flow permits a web service (confidential client) to use its own credentials, instead of impersonating a user, to authenticate when calling another web service. You can read more about this method of obtaining a Bearer token [here](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow).

It then uses the token to invite a guest user to the organization by making a `HTTP POST` call to the specified endpoint with the mentioned payload.

## Invoke the Logic App

If you manually invoke the logic app, you will see that the run is successful and you would have also received an email invite to the organization. The custom message and the emojis are all there. Cool 😎😎😎.

![Guest Invitation Email](/assets/images/guest-user-email.png)

Once you click on "Get Started" button, you will be guided to the invitation redemption steps and then be redirected to the application URL that was specified in `inviteRedirectUrl` in the request body. After you have everything working, you can disable the logic app (or not).  

## Closing Remarks

I have previously written about [inviting guest users using Powershell](https://www.gurucharan.in/azure/powershell/how-to-invite-guest-users-to-azure-active-directory-with-powershell/). The disadvantage with the PowerShell approach (and the Azure Portal approach) is that it requires me to log in and sends the invite as me. It would say Gurucharan has invited you to da da da. And I don't want that.

With Logic Apps, you can easily invite application users as the application itself. Very useful in situations where this process needs to be fully automated. These are simple HTTP calls and so you can also do this as part of your core applications or have an Azure Function invite users as well. If Azure Functions excite you, take a look [at the Microsoft Graph bindings for Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-microsoft-graph).