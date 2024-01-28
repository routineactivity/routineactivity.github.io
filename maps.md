---
layout: default
---

<h2>Maps</h2>
<ul>
{% for map in site.maps %}
  <li>
    <a href="{{ map.url }}">{{ map.title }}</a>
    <p>{{ map.excerpt | strip_html | truncatewords: 50, "..." }}</p>
  </li>
{% endfor %}
</ul>
