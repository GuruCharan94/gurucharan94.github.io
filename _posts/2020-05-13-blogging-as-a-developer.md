---
title: Lessons learned by blogging as a Developer
date: 2020-05-13
header:
  teaser: "/assets/images/blogging-as-a-developer.jpg"
  thumbnail:  "/assets/images/blogging-as-a-developer.jpg"
  og_image: "/assets/images/blogging-as-a-developer.jpg"
categories:
- Blog
tags:
- Blog
- Meta
- Career
- Lifeskills
excerpt: In this blog post, I write about why I set-up my blog (yes, very meta) using GitHub pages on my own domain. I write about cross-posting, SEO optimization, my blogging schedule and ultimately figuring out why I blog.
ogImage:
  title: "**Lessons learned by blogging as a Developer**"
  subtitle: "www.gurucharan.in | @gurucharan94"
  filename: "blogging-as-a-developer"
  fontSize:  "120%"
---

In this blog post, I write about why I set-up my blog (yes, very meta) using GitHub pages on my own domain. I write about cross-posting, SEO optimization, my blogging schedule and ultimately figuring out why I blog.

## 1. Choosing a Blogging Platform

The biggest question I had when I started was where should I blog ? Medium ? Dev.to ? Or on my own website ?

The internet is a digital real estate and you have the chance to own your piece of land of the digital estate by choosing to blog on a domain you own. If you are blogging on a 3rd party medium, it means you have decided to rent. You are trading convenience for control and ownership. You are giving away your words to a 3rd party company. A company that can

- Change its terms and conditions that you surely carefully read
- Erroneously suspend/ban your profile
- Be hacked (I'm looking at you WordPress)
- Paywall your content or
- Simply go out of business.

[All your words, wasted. Your permalinks, gone.](https://www.hanselman.com/blog/YourWordsAreWasted.aspx). With your own blog, you have control. Your domain, your words, your permalinks, your theme.

### 1.1 Setting up a blog on GitHub Pages

If I have convinced you about setting up your own blog, the next question is what are the options available ? While there are many blogging platforms, I like using [GitHub Pages](https://pages.github.com/) to host my blog and I have my reasons.

- It is FREE.
- I can set it up very quickly.
- I understand git and GitHub (to an extent 😂)
- Plenty of [themes available on GitHub](https://github.com/planetjekyll/awesome-jekyll-themes) for me to choose from.
- I can customize the themes to my liking while still respecting the license terms.
- I can host it on my domain if I have one (you should have one!!).

If you want to set up a blog using GitHub pages, you have to

1. Choose a [Jekyll Theme]((https://github.com/planetjekyll/awesome-jekyll-themes)). I use the [minimal mistake theme.](https://github.com/mmistakes/minimal-mistakes). It comes with a full-text search, disqus integration for comments, pagination, tags, categories, atom feed and everything I needed.

2. Fork the source repository and rename it to `username.github.io`

3. You will have a basic empty blog available with HTTPS at **https://username.github.io**.

But isn't GitHub pages a third-party platform ? No. It merely provides free hosting for blogs powered by [the open-source Jekyll blogging software](https://github.com/jekyll/jekyll). If GitHub goes out of business (I don't see that happening), I can simply move to a different host or spin up a server on the cloud that can host a Jekyll site. Then, I make some changes to the DNS records and my blog is available again. No broken URL's. All of this is possible because my blog and it's contents are exportable and portable.

Owning my content does not mean rolling out a custom blogging engine. Believe me, I tried. It's not worth it.

## 2. Improving Viewership by Cross-Posting

While I blog on my domain, I can still cross-post on popular websites. Medium let's me import my blog posts. Dev.to can import from my RSS Feed. When I cross-post on other platforms, there is a special `rel=canonical` thing in the post, that says this post was originally posted on some other domain and so cross-posting does not cost me search engine points. I realized that I made up the term when writing this. *Search Engine Points*.

By cross-posting content, I get the best of both worlds. I own my content and can still improve my viewership.

## 3. SEO Optimization

The next thing I do is optimize my posts for search engines and social media sharing. What I mean by that is not stuffing keywords in my blog but rather adding the right metadata for my blog posts so that social media creates a good preview for it. My Jekyll theme did most of the work for me.

I might have customized it a bit and you can see how many meta tags I have in the `<head>` section. If this is new to you, an internet search on SEO will help you.

```html
<title>Title of the post</title>
<meta name="description" content="">
<meta name="robots" content="follow,index">
<link rel="icon" type="image/png" href="/assets/images/logo.png">
<meta property="og:type" content="article">
<meta property="og:locale" content="en_US">
<meta property="og:site_name" content="Gurucharan94">
<meta property="og:title" content="">
<meta property="og:url" content="">
<meta property="og:description" content="">
<meta property="og:image" content="">
<meta name="twitter:site" content="@gurucharan94">
<meta name="twitter:title" content="">
<meta name="twitter:description" content="">
<meta name="twitter:url" content="">  
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="">
<meta property="article:published_time" content="">
<link rel="canonical" href="">
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Gurucharan Subramani",
      "alternateName":"Gurucharan94",
      "url": "https://www.gurucharan.in",
      "sameAs": ["https://www.linkedin.com/in/gurucharan94","https://twitter.com/gurucharan94","https://github.com/gurucharan94"]
    }
  </script>
```

I spend more time making a good cover image for my blog than actually writing my blog posts. [So I decided to fix it once and for all with GitHub Actions](https://www.gurucharan.in/blog/github-actions/auto-generate-open-graph-images-with-github-actions/).

## 4. Schedule and Consistency

When I started a year ago, I decided I want to write at least one blog post every month and see if I can consistently do it for a year. For the most part, I was successful. This year I wanted to write at least two every month. And then I see myself writing every week. I wanted to start small, be consistent and take it from there. To start with a goal of I will write every week would have surely set me up for failure.

Off late, I have realized that I should publish on a schedule. Not 2 blog posts on the first of the month because I've already written them and then nothing for 45 days. I want to have a few blog posts written upfront but published later on a schedule. Every alternate Wednesday or something like that. To do that, I will future date my blog posts and use [GitHub actions to publish when the time comes](https://seankilleen.com/2020/02/how-to-deploy-github-pages-on-a-schedule-to-publish-future-posts/).

## 5. But... I have nothing to blog about

**I've been there. I felt that I have nothing interesting to blog about. What if I am wrong ? I am no expert. What if nobody reads it ?**

The answer to all this comes down to why I wanted to blog. My blog is a collection of my notes, bookmarks, ideas, solutions and thoughts made public. It is a love letter to my future self. I write so that I can later do an internet search of my words. I am not trying to "influence" you. I am not attempting to sell you anything. I am trying to write things down because I can't remember everything. And I let you know about my writing in the hope that you find something interesting on my blog. If something was interesting to me, there is a good chance someone else will find it interesting as well. Once the **Why  I Blog** was clear to me, I'm no longer looking for that perfect blog post. I'm writing [more frequently](https://haacked.com/archive/2019/05/24/write-every-day/). I am not trying to position myself as the expert. I am merely an "experienced beginner". Aren't we all?
