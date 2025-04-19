---
layout: default
---

<h2 style="padding: 25px;">Maps</h2>
<ul style="padding: 0 30px;">
{% for post in site.maps %}
  <li>
    <a href="{{ map.url }}">{{ map.title }}</a>
    <p>{{ post.excerpt | strip_html | truncatewords: 75, "..." }}</p>
    <p>Last Updated: {{ map.last_updated | date: "%B %d, %Y" }} - {{ map.content | number_of_words | divided_by: 200 | ceil }} min read</p>
  </li>
{% endfor %}
</ul>
