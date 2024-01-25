---
layout: page
title: ""
---

<img src="/assets/ra_logoidea.jpg" alt="Logo" style="width: 300px; height: auto;">

I am currently a Data Scientist specialising in geographical information. My main interests are crime analysis, problem-solving and evidence-based policing.

## Recent Posts

<h2>Recent Posts</h2>
<ul>
{% for post in site.posts limit:5 %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a>
    <p>{{ post.date | date: "%B %d, %Y" }}</p>
  </li>
{% endfor %}
</ul>

## Recent Presentations
