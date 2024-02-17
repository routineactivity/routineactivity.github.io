---
layout: default
---

<h2>Posts</h2>
<ul>
{% for post in site.posts %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a>
    <p>{{ post.excerpt | strip_html | truncatewords: 150, "..." }}</p>
  </li>
{% endfor %}
</ul>
