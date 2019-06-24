---
title: "Accessibility tests for your website with Google Lighthouse"
date: 2019-06-23
header:
  teaser: "/assets/images/google-lighthouse/score.png"
  thumbnail: "/assets/images/google-lighthouse/score-thumbnail.png"
  og_image: "/assets/images/google-lighthouse/score.png"
categories:
  - Web
tags:
  - Accessibility
excerpt: "This post shows you how to check your website for accessibility issues and fix them with Google LightHouse"
---

[Lighthouse](https://developers.google.com/web/tools/lighthouse/) is an open-source tool for auditing performance,accessibility and SEO of your web-pages. You give Lighthouse a URL to audit, it runs a series of audits against the page, and then it generates a report on how well the page did.

You can run Lighthouse from the command line, or as a Node module but the easiest way is to run it from within Chrome. **Navigate to your Website :arrow_right: F12 :arrow_right: Audit Tab :arrow_right: Run Audit.** The audit runs for a couple of minutes and you get a nice scorecard like the one below. Each category of audit has a detailed list of rules and links to supporting documentation explaining the individual audit rules and what you can do to pass the audit and improve your overall score.

<figure>
  <img class="lazyload" data-src="/assets/images/google-lighthouse/score.png"
  src="/assets/images/loadingicon.gif" alt="LightHouse Score of My Blog"/>
  <figcaption> LightHouse Score of my Blog </figcaption>
</figure>

## Common Issues

I ran the lighthouse audits on my own blog and a few other websites / blogs as well and the most common audit rules that did not pass are listed below.

- **Accessibility**
  - Background and foreground colors did not have a sufficient contrast ratio.
  - Image elements did not have [alt] attributes.
  - Form elements did not have associated labels.

- **SEO**
  - Tap targets are not sized appropriately. Buttons and links should be large enough (48x48px) and be easy to tap without overlapping onto other elements.

- **Best Practices**
  - Front-end javascript libraries with known security vulnerabilities (and it was almost always Jquery).

## Accessibility Results

There was another interesting trend that I noticed on the 20 or so websites that I ran the audits on.

- Almost all websites scored 90 or higher on Performance, SEO, and Best Practices.
- Less than half of them crossed the 80 mark on Accessibility

I think the results boils down to the fact that **we understand that accessibility is important but it is not always clear how to make our sites more accessible.** This is where accessibility testing tools like Google LightHouse and others can play a big role in simplifying things. I can run these test from the command line and that means I can now add accessibility tests to my pipelines and make this an equal priority as the other functional or performance tests.

If you want to read more on accessibility, [The A11Y Project](https://a11yproject.com/) is a nice website with a fantastic collections of blog posts, videos and tools that you can use to make the web more accessible.
