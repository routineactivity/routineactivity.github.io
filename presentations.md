---
layout: default
---

## Presentations

<ul>
{% for post in site.presentations %}
  <li>
    <a href="{{ presentations.url }}">{{ presentations.title }}</a>
  </li>
{% endfor %}
</ul>
