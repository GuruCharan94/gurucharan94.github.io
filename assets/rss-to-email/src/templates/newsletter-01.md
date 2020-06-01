---
title: "{{header.title}}"
date: ""
image : "/assets/images/newsletter/{{header.issue}}.jpg"
header:
  teaser: "/assets/images/newsletter/{{header.issue}}.jpg"
  thumbnail:  "/assets/images/newsletter/{{header.issue}}.jpg"
  og_image: "/assets/images/newsletter/{{header.issue}}.jpg"
categories:
- Newsletter
excerpt: {{header.intro}}
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

If you liked this issue of the newsletter, please tell your friends about it on social media using the icons below.
{% include social-share.html %}

If you have any feedback for me, feel free to share them in the comments section and if you like to receive these updates delivered straight to your inbox twice a month, subscribe using the form below.

{% include newsletter-subscription-form.html %}
