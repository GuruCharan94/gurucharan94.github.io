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
excerpt: "{{header.intro}}"
---

{{header.intro}}

{{#if sponsorName}}
// TODO
{% include newsletter-sponsor sponsorLink={{sponsorLink}} sponsorName={{sponsorName}} sponsorMessage={{sponsorMessage}}  %}
{{/if}}

{{#each feeds}}

## {{this.title}}

{{#each items}}

### [{{this.title}}]({{this.link}})

{{this.description}}
{{/each}}
{{/each}}

If you have any feedback for me, feel free to share them in the comments section and if you like to receive these updates delivered straight to your inbox twice a month, subscribe using the form below.

{% include newsletter-subscription-form.html %}
