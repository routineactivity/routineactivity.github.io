---
title:  "Reconciling harm weighting and count-based analysis"
layout: post
date: 2024-02-17
last_updated: 2024-02-17
tags: [crime mapping, hotspots, crime harm]
---

This week the Home Office published its  <a href="https://www.gov.uk/government/publications/hot-spot-policing-in-england-and-wales-year-ending-march-2022/evaluation-report-on-grip-and-bespoke-funded-hot-spot-policing#:~:text=Key%20findings,over%2080%2C000%20weapons%20were%20collected." target="_blank">Evaluation report on Grip and bespoke-funded hot spot policing</a>, which was the largest national effort in observing and evaluating visible patrol as a strategy to reduce crime in hotspots - in this case high violence locations in England and Wales. 

For similarly large-scale national efforts at hotspots, we probably have to go back some way to the _Burglary Reduction Initiative_ (1998-2002, 247 sites, problem-solving at hotspots) and _Street Crime Initiative_ (2002-2004, 10 police forces containing 83% of robbery, problem-solving at hotspots). 

In this short article, I'd like to address one of the analytical challenges coming from the evaluation - *crime harm versus crime volume for hot spot identification*.

### Crime harm versus crime volume

Policing has traditionally used crime volumes to identify hot areas. The analysis of crime point data has typically favoured KDE (Kernel Density Estimation), a method that generates aesthetically pleasing smooth surfaces. In <a href="https://static1.squarespace.com/static/5d809efd96f5c906aaf61f3d/t/601bf1485cd3ca249e99a12c/1612443985497/Hotspots+vs.+harmspots+Shifting+the+focus+from+counts+to+harm+in+the+criminology+of+place.pdf" target="_blank">recent years</a>, there has been a shift towards experimenting with harm-weighted hotpots, recognising that the impact of offences is not equal across offence types. However, analysts using harm weights have learned that there is a tendency for higher weighted crime, such as a single homicide, to skew selections of the hottest places for intervention. 

The <a href="https://link.springer.com/article/10.1007/s41887-020-00043-2" target="_blank">Cambridge Crime Harm Index (CCHI)</a> and <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/articles/researchoutputsdevelopingacrimeseverityscoreforenglandandwalesusingdataoncrimesrecordedbythepolice/2016-11-29" target="_blank">Crime Severity Score (CSS)</a> both generate weights based on sentencing days (CCHI uses the start point, CSS uses the average), which for a basket of violent crimes can produce weights that range from fewer than 20 for common assault to more than 3,000 for crimes of attempted murder and homicide. 

### Analytical challenges

When harm-weighted hotspot analyses are conducted using the CCHI/CSS they can produce *'frequency deserts'* - harm-weighted hotspots where very few or just 1 event has occurred. If our intervention involves patrolling a hotspot, it might not be the best use of resources to send an officer every day to a location where a single isolated event of homicide was the only violent crime to have occurred in a 12-month or longer analytical timeframe.

So why not just use the highest weighted crimes to identify count-based hotspots? Fortunately, events of homicide, attempted murder and weapon-enabled serious wounding occur at **relatively** low levels in England and Wales. This means that few areas experience space-time clustering of higher weighted crimes within a given year, and those that do are often not stable from one year to the next. 

One approach to this problem is to draw on longer-term data and use a recency weighting, but this can still fail to produce small enough areas suitable for hotspot patrol deployments when limited to the lens of homicide, attempted murder and weapon-enabled wounding. 

Another is to include similar behavioural problems that are more frequent but lower weighted, such as wounding offences that did not involve the use of knives and firearms. This can produce another type of skew, where concentrated volumes of lower weighted events, such as bar fights in a night-time economy, moderate locations where there is a presence of both higher and lower weighted events.

Further commentary on these challenges is discussed in a recent paper by Vincent Harinam, Zeljko Bavcevic and Barak Ariel: <a href="https://crimesciencejournal.biomedcentral.com/articles/10.1186/s40163-022-00176-x" target="_blank">Spatial distribution and development trajectories of crime versus crime severity: do no abandon the count-based model just yet</a>.

### (Imperfect) solutions

The solution to removing *'frequency deserts'*, can often be a manual correction. This can be a time burden for someone working in a large urban area or across an entire police force. It can involve making arbitrary cut-off decisions. What do too few offences mean? Less than 10? Less than 1 per week? Less than 1 per month? This can become an iterative loop, which can be fine for a single-time study or intervention, but you do not want to rehash this manual process over and over again. 

Something I have experimented with is applying transformations to the raw CCHI/CSS values. The aim is to be able to generate hotspot information that amplifies higher weighted events without generating the frequency deserts. The table below provides an overview of weights that can be applied to a basket of violent crimes, beginning from the raw CCHI value. For example, a homicide is weighted as 5,475 using the CCHI. A log transformation of this value produces a weight of 9 and a square root transformation of this value produces a weight of 74. The count treats all crimes equally.

<br>

|Crime type|CCHI days|CCHI years|CCHI Log|CCHI SQRT|Count - no weights|
|:---------|:-------:|:--------:|:------:|:-------:|:---:|
|Homicide|5,475|15.00|9|74|1|
|Attempted Murder|3,285|9.00|8|57|1|
|Rape|1,825|5.00|8|43|1|
|Firearms|730|2.00|7|27|1|
|Serious Assault|547|1.50|6|23|1|
|Robbery|365|1.00|6|19|1|
|Common Assault|19|0.05|2|3|1|

<br>

I have produced visuals to demonstrate the differences in hotspot surfaces produced when applying different transformations of the CCHI. The data is derived from www.crimemapping.com and uses violence, sexual and robbery offences recorded by the Grand Rapids PD in Michigan for the period August 2023 to February 2024. I have added a best-fit CCHI value to each crime category within the dataset.

### Comparison maps

All visuals utilise KDE with a consistent spatial bandwidth (550) and cell size (20). 

#### 1. Unweighted hotspots (count) vs. CHI weighted (raw values)

The first comparison shows the difference between an unweighted and CHI weighted hotspot surface. This demonstrates why harm weighting has become a consideration as many harmful places are absent using counts alone. 

<img src="/assets/images/GR01_2024-02-17.jpg" alt="Logo" style="width: 800px; height: auto;">

I have added labels in this second map to highlight some of the frequency deserts that the CHI weighted surface has identified.

<img src="/assets/images/GR02_2024-02-17.jpg" alt="Logo" style="width: 800px; height: auto;">

#### 2. Unweighted hotspots (count) vs. CHI weighted (log transform)

This time the CHI weights have been transformed using a natural logarithm (LN). This more closely resembles the unweighted surface because the new values have been brought much closer together. Here the weighting difference between a homicide (9) and robbery (6) is just three. This amplifies the existing count hotspots, but isn't emphasising higher weighted events to the extent that we would like it to.

<img src="/assets/images/GR03_2024-02-17.jpg" alt="Logo" style="width: 800px; height: auto;">

#### 3. Unweighted hotspots (count) vs. CHI weighted (sqrt transform)

We now transform the CHI weights by taking the square root (SQRT). We can see similarities with the CHI weighted (raw values) surface. Does this solve the problem of frequency deserts?

<img src="/assets/images/GR04_2024-02-17.jpg" alt="Logo" style="width: 800px; height: auto;">

#### 4. CHI weighted (sqrt transform) vs. CHI weighted (raw values)

From an exploratory perspective, the square root transform assists in reducing the skew caused by frequency deserts whilst still being able to emphasise harm. 

In Grand Rapids, the CCHI square root transform captured 5% more crime counts among the top 10% of its hotspot surface, compared to the top 10% of the surface produced by CCHI values left untransformed. This is the equivalent of up to **300 more crimes**. 

In terms of harm, there were **732 harm days lost** among the top 10% of the CCHI square root transform surface, compared to the top 10% of the CCHI untransformed. This is the equivalent of losing 2x robberies, or 1x firearms incident from the selection of hotspot areas. 

More robust testing is no doubt required, but the transformation of harm weights may be a helpful method when applied to spatial point pattern analyses.

<img src="/assets/images/GR05_2024-02-17.jpg" alt="Logo" style="width: 800px; height: auto;">

### Further reading

* <a href="https://discovery.ucl.ac.uk/10076721/8/Ashby_Comparing%20Methods%20for%20Measuring%20Crime%20Harm%20Severity_AAM.pdf" target="_blank">Ashby, M. (2018) Comparing methods for measuring crime harm/severity</a>
* <a href="https://crimesciencejournal.biomedcentral.com/articles/10.1186/s40163-022-00176-x" target="_blank">Harinam et al (2022) Spatial distribution and development trajectories of crime versus crime severity: do no abandon the count-based model just yet</a>
* <a href="https://www.gov.uk/government/publications/hot-spot-policing-in-england-and-wales-year-ending-march-2022/evaluation-report-on-grip-and-bespoke-funded-hot-spot-policing#:~:text=Key%20findings,over%2080%2C000%20weapons%20were%20collected." target="_blank">Home Office (2023) Evaluation report on Grip and bespoke-funded hot spot policing</a>
* <a href="https://link.springer.com/article/10.1007/s41887-020-00043-2" target="_blank">Sherman (2020) How to count crime: the Cambridge Harm Index consensus</a>
* <a href="https://static1.squarespace.com/static/5d809efd96f5c906aaf61f3d/t/601bf1485cd3ca249e99a12c/1612443985497/Hotspots+vs.+harmspots+Shifting+the+focus+from+counts+to+harm+in+the+criminology+of+place.pdf" target="_blank">Weinborn et al (2017) Hotspots vs. harm spots: Shifting the focus from counts to harm in the criminology of place</a>

<br>

I originally posted this on <a href="https://medium.com/@routineactivity85/reconciling-harm-weighting-and-count-based-analysis-e0e57a50989c" target="_blank">Medium</a>


