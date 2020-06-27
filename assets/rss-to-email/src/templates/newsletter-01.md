---
title: "{{header.title}}"
date: ""
permalink: /newsletter/{{header.issue}}
image : "/assets/images/newsletter/{{header.issue}}.jpg"
header:
  teaser: "/assets/images/newsletter/{{header.issue}}.jpg"
  thumbnail:  "/assets/images/newsletter/{{header.issue}}.jpg"
  og_image: "/assets/images/newsletter/{{header.issue}}.jpg"
categories:
- Newsletter
tags:
- Newsletter
excerpt: "{{header.intro}}"
---

The [Curated Bytes](https://www.gurucharan.in/newsletter/) is a newsletter that I publish twice a month with the **latest on Azure, .NET, DevOps, Container Technologies and other interesting things**.

{{header.intro}}

{{#if sponsorName}}
// TODO
{% include newsletter-sponsor sponsorLink={{sponsorLink}} sponsorName={{sponsorName}} sponsorMessage={{sponsorMessage}}  %}
{{/if}}

{{#each feeds}}

{{#if this.title}}
## {{{this.title}}}
{{/if}}

{{#each items}}

### [{{{this.title}}}]({{{this.link}}})

{{{this.description}}}
{{/each}}
{{/each}}

{% include newsletter-subscription-form.html %}
