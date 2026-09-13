---
layout: page
title: ""
---

<img src="/assets/ra_logoidea.jpg" alt="Logo" style="width: 200px; height: auto;">

I currently work in a law enforcement data science team, with a focus on **geospatial analysis**. My interests lie in **crime analysis**, particularly understanding the **spatial distribution and concentration of crime**, and how these patterns relate to the physical and built environment. More broadly, I'm passionate about leveraging diverse data sources to better understand public safety challenges, inform problem-solving approaches, and evaluate the impact of interventions.

Please note that all content on this site — including blog posts, articles, and opinions — reflects **my personal views** and not those of any employer, organisation, or affiliation. 

<h2>Recent Posts</h2>
<ul>
{% assign sorted_posts = site.posts | sort: "date" | reverse %}
{% for post in sorted_posts limit:3 %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a>
    <p>{{ post.date | date: "%B %d, %Y" }}</p>
    <p>{{ post.content | strip_html | truncatewords: 50, "..." }}</p>
  </li>
{% endfor %}
</ul>

<h2>Recent Maps</h2>
<ul>
{% assign sorted_maps = site.maps | sort: "date" | reverse %}
{% for map in sorted_maps limit:3 %}
  <li>
    <a href="{{ map.url }}">{{ map.title }}</a>
    <p>{{ map.date | date: "%B %d, %Y" }}</p>
    <p>{{ map.content | strip_html | truncatewords: 50, "..." }}</p>
  </li>
{% endfor %}
</ul>
