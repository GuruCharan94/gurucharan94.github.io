---
title: "Auto Generate Open Graph Cover Images for your blogs posts with GitHub Actions"
date: 2020-05-01
image : "/assets/images/auto-generate-og-image.jpg"
header:
  teaser: "/assets/images/auto-generate-og-image.jpg"
  thumbnail: "/assets/images/auto-generate-og-image.jpg"
  og_image: "/assets/images/auto-generate-og-image.jpg"
categories:
- Blog
- GitHub-Actions
tags:
- Blog
- Meta
- Productivity
- Automation
- GitHub-Actions

ogImage:
  title: "**Auto Generate OG image with GitHub Actions**"
  subtitle: "www.gurucharan.in | @gurucharan94"
  filename: "auto-generate-og-image" 
  fontSize: "120%"

excerpt: In this blog post, I show you how I auto-generate a simple, consistent preview image using GitHub Actions for my Jekyll powered blog hosted on GitHub pages.

---

I spend more time making a social media preview image for my blog than actually writing my blog posts. And more often than not, I end up with a preview image that I am fully convinced about. And then I decide to spend more time on this on my next blog post to get a better preview and round and round it goes. Talk about #bikeshedding.

In this blog post, I show you how to auto-generate a simple, consistent preview image using [GitHub Actions](https://github.com/features/actions) for your Jekyll powered blog hosted on GitHub pages.

## What are GitHub Actions

[GitHub Actions](https://help.github.com/en/actions/getting-started-with-github-actions/about-github-actions) help you automate your software development workflows. You can write individual tasks, called actions, and combine them to create a custom workflow.

Workflows are custom processes that usually helps to build, test, package, release, or deploy any code. Here we use an existing action in the marketplace to auto-generate open graph images for my blog posts.

You can find [this action in the marketplace](https://github.com/marketplace/actions/generate-og-image)

## Creating the workflow with GitHub Actions

To create a new workflow, I created a new `main.yml` file (the name of the file does not matter) under `.github/workflows` folder, and pasted the contents below.

```yaml

name: "Generate OG Images"
on: pull_request

jobs:
  generate_og_job:
    runs-on: ubuntu-latest
    name: Generate OG Images
    steps:
      - name: Checkout
        uses: actions/checkout@v1
      - name: Generate Image
        uses: BoyWithSilverWings/generate-og-image@1.0.3
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GITHUB_CONTEXT: ${{ toJson(github) }}
        with:
          path: assets/images/
          commitMsg: Auto Generated OG image
          fontColor : "#00695c"
```

In the next step, I add the below contents to the front matter of the markdown file that contains the blog post.

```yaml

ogImage:
  title: "**Auto Generate OG image with GitHub Actions**"
  subtitle: "www.gurucharan.in | @gurucharan94"
  filename: "auto-generate-og-image-no-subtitle-updated-font-size-120-bold-text-green-font"
  fontSize: "120%"

```

## How does this work?

- GitHub automatically triggers the workflow on every Pull Request (PR) as specified in the `main.yml` file.

- It checks if there are any markdown files that are changed as part of the PR and then reads the appropriate settings. File specific settings specified in the front matter of the YAML file takes precedence over the repository level settings specified in `main.yml` (`with` section).

- A preview image is then created and the pull request is updated by adding this new jpeg file and a preview is available as a comment in the PR page.

- If you are not happy with the image and want to generate a new one with different settings, please ensure that you provide a new file name. There seems to be a problem overwriting files. Not a show stopper by any means.

You should [look at the docs](https://github.com/marketplace/actions/generate-og-image) for details about the different configuration options.

Take a look at this [pull request](https://github.com/GuruCharan94/gurucharan94.github.io/pull/11) for a demo with multiple configuration options.

The GitHub action merely generates a nice image for you. You need the appropriate meta tags in the `<head>` section of your HTML page if you need the preview to show up when you hit share on social media. If you are reading this from your laptop or computer, you can (should) hit F12 right now to open up the developer tools and browse the code for this page.

With preview image generation automated, I'm hoping I will spend time more time ACTUALLY blogging.
