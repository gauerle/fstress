---
title: "{{title}}"
authors: {% for creator in creators %}{{creator.firstName}} {{creator.lastName}}{% if not loop.last %}, {% endif %}{% endfor %}
year: {% if date %}{{date | format("YYYY")}}{% endif %}
citekey: {{citekey}}
design: "{% for annotation in annotations %}{% if annotation.comment == '#design' %}{{annotation.annotatedText | truncate(200)}}{% endif %}{% endfor %}"
units: "{% for annotation in annotations %}{% if annotation.comment == '#units' %}{{annotation.annotatedText | truncate(200)}}{% endif %}{% endfor %}"
samplesize: {% for annotation in annotations %}{% if annotation.comment == '#samplesize' %}{{annotation.annotatedText | truncate(200)}}{% endif %}{% endfor %}
countries: "{% for annotation in annotations %}{% if annotation.comment == '#countries' %}{{annotation.annotatedText | truncate(200)}}{% endif %}{% endfor %}"
theories:{% for annotation in annotations %}{% if annotation.comment == '#theories' %}
  - "{{annotation.annotatedText | truncate(200)}}"{% endif %}{% endfor %}
analyses: "{% for annotation in annotations %}{% if annotation.comment == '#analyses' %}{{annotation.annotatedText | truncate(200)}}{% endif %}{% endfor %}"
scales: "{% for annotation in annotations %}{% if annotation.comment == '#scales' %}[[{{annotation.annotatedText | truncate(200)}}]]{% endif %}{% endfor %}"
hypotheses:{% for annotation in annotations %}{% if annotation.comment == '#hypotheses' %}
  - "{{annotation.annotatedText | truncate(200)}}"{% endif %}{% endfor %}
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
{% if annotation.annotatedText and annotation.comment != '#design' and annotation.comment != '#units' and annotation.comment != '#samplesize' and annotation.comment != '#countries' and annotation.comment != '#theories' and annotation.comment != '#analyses' and annotation.comment != '#scales' and annotation.comment != '#hypotheses' and annotation.comment != '#keyfindings' and annotation.comment != '#quality' and annotation.comment != '#focus'%}
> [!quote]- {{citekey}} - [p. {{annotation.pageLabel}}]({{annotation.desktopURI}})
> {{annotation.annotatedText}}
{% if annotation.comment %}
> 
> **Note:** {{annotation.comment}}
{% endif %}

{% endif %}
{% endfor %}