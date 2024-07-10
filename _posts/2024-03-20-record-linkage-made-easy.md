---
title:  "Record linkage made easy"
layout: post
date: 2024-03-20
last_updated: 2024-07-10
tags: [crime-data]
---
_Merging multiple datasets and gaining a view of unique persons in administrative data is a regular obstacle for data professionals. But with <a href="https://moj-analytical-services.github.io/splink/index.html" target="_blank">Splink</a> that process can be fast, accurate and scaleable._

![AI image Person Link Network](/assets/images/2024-03-20-ai-image.png)

We often need to collate a single-person view in criminal justice and law enforcement. It may be to understand a person's journey through the system, identify a trajectory or help understand overall risk and harm.

When working with legacy systems, it might mean that a person's records are spread across multiple databases (arrests, intelligence, crimes, stops). There may not be a unique ID attached to that person. Their name, dates of birth or other identifiers may be affected by inconsistent data entry (different spellings, exclusion or inclusion of middle names, a miskeyed digit in date of birth).

Newer systems that claim a ‘golden thread’ by the presence of a unique identifier across databases are not immune from duplicate creation either. Moving addresses, changing names, and providing incorrect information (knowingly or mistakenly) can lead to duplication. Providing false particulars to obfuscate and evade law enforcement sanctions can also lead to problematic data.

I’d dealt with this previously using different string matching techniques — cosine, Jaccard, soundex and <a href="https://andrewpwheeler.com/2015/07/01/some-ad-hoc-fuzzy-name-matching-within-police-databases/" target="_blank">Levensthein</a>. I created a short notebook <a href="https://github.com/routineactivity/adhoc_notebooks/blob/main/splink/String_Distance_Methods.ipynb" target="_blank">here</a> using Premier League footballer names and ID numbers comparing these methods.

<br>

![Different string matching techniques](/assets/images/2024-03-20-notebook-football.png)

<br>

I wasn’t aware of Splink until last year when a colleague introduced it to me. It is nothing short of amazing. The documentation is great and there are a variety of options that you can walk through over at the Splink GitHub page. Designed to be fast enough to link 100 million records, I was pleased to find I could de-dupe and assign unique identifiers to a sample dataset of over 400,000 records in less than 20 seconds.

I’ve made available a short worked example using Splink’s <a href="https://moj-analytical-services.github.io/splink/demos/examples/duckdb/quick_and_dirty_persons.html" target="_blank">‘Quick and Dirty Persons’</a> model which you can <a href="https://github.com/routineactivity/adhoc_notebooks/blob/main/splink/Splink%20Quick%20%26%20Dirty.ipynb" target="_blank">find at this link</a> (<a href="https://github.com/routineactivity/adhoc_notebooks/blob/main/splink/data_md_jb_v2.zip" target="_blank">data used at this link</a>). Apologies, that is a lot of links so far…

### Overview

* 415,987 rows of data on individual jail bookings
* 266,656 unique persons matched on full name and dob, no unique ID
* 239,166 unique persons matched by Splink and provided a unique ID
* 27,490 duplicates found
* Less than 20 seconds

### Further reading

* <a href="https://github.com/routineactivity/adhoc_notebooks/blob/main/splink/String_Distance_Methods.ipynb" target="_blank">Cosine, Jaccard, Levensthein and Soundex examples with Premier League footballers data</a>
* <a href="https://andrewpwheeler.com/2015/07/01/some-ad-hoc-fuzzy-name-matching-within-police-databases/" target="_blank">Some ad-hoc fuzzy name matching within police databases</a>
* <a href="https://moj-analytical-services.github.io/splink/index.html" target="_blank">Splink</a>
* <a href="https://www.gov.uk/government/publications/joined-up-data-in-government-the-future-of-data-linking-methods/splink-mojs-open-source-library-for-probabilistic-record-linkage-at-scale" target="_blank">Splink: MoJ’s open-source library for probabilistic record linkage at scale</a>

<br>

I originally posted this on [medium](https://medium.com/@routineactivity85/record-linkage-and-de-duplication-c1baa0607031).
