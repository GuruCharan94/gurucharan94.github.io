---
title: "{{header.title}} - Issue #{{header.issueNumber}}"
date: {{header.dateOfIssue}}
---

{{#if sponsorName}}
{% include newsletter-sponsor sponsorLink={{sponsorLink}} sponsorName={{sponsorName}} sponsorMessage={{sponsorMessage}}  %}
{{/if}}

{{#each feeds}}
## {{this.title}}
{{#each items}}

### [{{this.title}}]({{this.link}})

{{this.description}}
{{/each}}
{{/each}}

{% include social-share.html %}

{% include newsletter-subscribe.html %}
