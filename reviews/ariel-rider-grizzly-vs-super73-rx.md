---
title: 'Ariel Rider Grizzly vs. SUPER73 RX'
date: '2021-07-07'
---

<div class="relative" style="padding-top: 56.25%">
  <iframe class="absolute inset-0 w-full h-full" title="YouTube video player" src="https://www.youtube.com/embed/Xj3BkolDkGE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.
