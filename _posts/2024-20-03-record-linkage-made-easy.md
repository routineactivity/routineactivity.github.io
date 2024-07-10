---
title:  "Spatial units for crime analysis"
layout: post
date: 2024-20-03
last_updated: 2024-10-07
tags: [crime-data]
---
_Merging multiple datasets and gaining a view of unique persons in administrative data is a regular obstacle for data professionals. But with <a href="https://moj-analytical-services.github.io/splink/index.html" target="_blank">Splink</a> that process can be fast, accurate and scaleable._

![AI image Person Link Network](/assets/images/2024-03-20-ai-image.png)

We often need to collate a single-person view in criminal justice and law enforcement. It may be to understand a person's journey through the system, identify a trajectory or help understand overall risk and harm.

When working with legacy systems, it might mean that a person's records are spread across multiple databases (arrests, intelligence, crimes, stops). There may not be a unique ID attached to that person. Their name, dates of birth or other identifiers may be affected by inconsistent data entry (different spellings, exclusion or inclusion of middle names, a miskeyed digit in date of birth).

Newer systems that claim a ‘golden thread’ by the presence of a unique identifier across databases are not immune from duplicate creation either. Moving addresses, changing names, and providing incorrect information (knowingly or mistakenly) can lead to duplication. Providing false particulars to obfuscate and evade law enforcement sanctions can also lead to problematic data.

I’d dealt with this previously using different string matching techniques — cosine, Jaccard, soundex and Levensthein. I created a short notebook here using Premier League footballer names and ID numbers comparing these methods.

<a href="https://moj-analytical-services.github.io/splink/index.html" target="_blank">Splink</a>

Originally posted on [medium](https://medium.com/@routineactivity85/record-linkage-and-de-duplication-c1baa0607031).
