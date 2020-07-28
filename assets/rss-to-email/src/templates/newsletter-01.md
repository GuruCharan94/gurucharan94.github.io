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
excerpt: "The Bytes Watch is a collection of links to all the interesting things I read on Azure, .NET, DevOps, Container Technologies, Productivity, Career and Leadership."
---

The [Bytes' Watch](https://www.gurucharan.in/newsletter/) is a collection of links to some of the things I found new and interesting in the tech world. Usually has links about Azure, .NET, DevOps, Container Technologies, Productivity, Career and Leadership published as a blog post and also available as a newsletter.

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
