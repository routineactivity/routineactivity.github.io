---
layout: page
title: ""
---

<img src="/assets/ra_logoidea.jpg" alt="Logo" style="width: 200px; height: auto;">

I'm currently employed in a law enforcement data science team where I specialise in geographical information. I am interested in crime analysis, particularly the geographical distribution of crimes, their concentration and how that relates to the physical and built environment. More generally, I am interested in using a range of data sources to understand and seek to improve public safety problems and evaluate the effectiveness of interventions. 

The content on this site, including all blog posts, articles, and opinions, represents my own views and not those of any employer, company, or organisation I may be affiliated with. 

<h2>Recent Posts</h2>
<ul>
{% for post in site.posts limit:3 %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a>
    <p>{{ post.date | date: "%B %d, %Y" }}</p>
  </li>
{% endfor %}
</ul>

<h2>Recent Maps</h2>
<ul>
{% for map in site.maps limit:3 %}
  <li>
    <a href="{{ map.url }}">{{ map.title }}</a>
    <p>{{ map.date | date: "%B %d, %Y" }}</p>
  </li>
{% endfor %}
</ul>
