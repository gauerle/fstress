---
title: "{{title}}"
authors: {% for creator in creators %}{{creator.firstName}} {{creator.lastName}}{% if not loop.last %}, {% endif %}{% endfor %}
year: {% if date %}{{date | format("YYYY")}}{% endif %}
citekey: {{citekey}}
countries: "{% for annotation in annotations %}{% if annotation.comment == '#countries' %}{{annotation.annotatedText | truncate(200)}}{% endif %}{% endfor %}"
fsiname: "{% for annotation in annotations %}{% if annotation.comment == '#fsiname' %}{{annotation.annotatedText | truncate(200)}}{% endif %}{% endfor %}"
theories:{% for annotation in annotations %}{% if annotation.comment == '#theories' %}
  - "{{annotation.annotatedText | truncate(200)}}"{% endif %}{% endfor %}
aggregation: "{% for annotation in annotations %}{% if annotation.comment == '#aggregation' %}{{annotation.annotatedText | truncate(200)}}{% endif %}{% endfor %}"
keyfindings:{% for annotation in annotations %}{% if annotation.comment == '#keyfindings' %}
  - "{{annotation.annotatedText | truncate(200)}}"{% endif %}{% endfor %}
quality: "{% for annotation in annotations %}{% if annotation.comment == '#quality' %}{{annotation.annotatedText | truncate(200)}}{% endif %}{% endfor %}"
focus: "{% for annotation in annotations %}{% if annotation.comment == '#focus' %}{{annotation.annotatedText | truncate(200)}}{% endif %}{% endfor %}"
tags:
  - source
---

# {{title}}

{% persist "summary" %}
## Thoughts

*Head empty*
{% endpersist %}

---

## Annotations

{% for annotation in annotations %}
{% if annotation.annotatedText and annotation.comment != '#fsiname' and annotation.comment != '#pfsi' and annotation.comment != '#countries' and annotation.comment != '#theories' and annotation.comment != '#aggregation' and annotation.comment != '#keyfindings' and annotation.comment != '#quality'%}
> [!quote]- {{citekey}} - [p. {{annotation.pageLabel}}]({{annotation.desktopURI}})
> {{annotation.annotatedText}}
{% if annotation.comment %}
> 
> **Note:** {{annotation.comment}}
{% endif %}

{% endif %}
{% endfor %}