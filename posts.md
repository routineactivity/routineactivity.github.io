---
layout: default
---

## Posts

<ul>
{% for post in site.posts %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a>
    <p>{{ post.excerpt | strip_html | truncatewords: 50, "..." }}</p>
  </li>
{% endfor %}
</ul>
