---
layout: default
---

<h2 style="padding: 25px;">Posts</h2>
<ul style="padding: 0 30px;">
{% for post in site.posts %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a>
    <p>{{ post.excerpt | strip_html | truncatewords: 75, "..." }}</p>
    <p>Last Updated: {{ post.last_updated | date: "%B %d, %Y" }} - {{ post.content | number_of_words | divided_by: 200 | ceil }} min read</p>
  </li>
{% endfor %}
</ul>
