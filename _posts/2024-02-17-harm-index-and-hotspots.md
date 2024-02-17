---
title:  "Reconciling harm weighting and count-based analysis"
layout: post
---

This week the Home Office published its  <a href="https://www.gov.uk/government/publications/hot-spot-policing-in-england-and-wales-year-ending-march-2022/evaluation-report-on-grip-and-bespoke-funded-hot-spot-policing#:~:text=Key%20findings,over%2080%2C000%20weapons%20were%20collected." target="_blank">Evaluation report on Grip and bespoke-funded hot spot policing</a>, which was the largest national effort in observing and evaluating visible patrol as a strategy to reduce crime in hotspots - in this case high violence locations in England and Wales. 

For similarly large-scale national efforts at hotspots, we probably have to go back some way to the _Burglary Reduction Initiative_ (1998-2002, 247 sites, problem-solving at hotspots) and _Street Crime Initiative_ (2002-2004, 10 police forces containing 83% of robbery, problem-solving at hotspots). 

In this short article, I'd like to address one of the analytical challenges coming from the evaluation - *crime harm versus crime volume for hot spot identification*.

### Crime harm versus crime volume

Policing has traditionally used crime volumes to identify hot areas. The analysis of crime point data has typically favoured KDE (Kernel Density Estimation), a method that generates aesthetically pleasing smooth surfaces. In <a href="https://static1.squarespace.com/static/5d809efd96f5c906aaf61f3d/t/601bf1485cd3ca249e99a12c/1612443985497/Hotspots+vs.+harmspots+Shifting+the+focus+from+counts+to+harm+in+the+criminology+of+place.pdf" target="_blank">recent years</a>, there has been a shift towards experimenting with harm-weighted hotpots, recognising that the impact of offences is not equal across offence types. However, analysts using harm weights have learned that there is a tendency for higher weighted crime, such as a single homicide, to skew selections of the hottest places for an intervention. 

The <a href="https://link.springer.com/article/10.1007/s41887-020-00043-2" target="_blank">Cambridge Crime Harm Index (CCHI)</a> and <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/articles/researchoutputsdevelopingacrimeseverityscoreforenglandandwalesusingdataoncrimesrecordedbythepolice/2016-11-29" target="_blank">Crime Severity Score (CSS)</a> both generate weights based on sentencing days (CCHI uses the start point, CSS uses the average), which for a basket of violent crimes can produce weights that range from fewer than 20 for common assault to more than 3,000 for crimes of attempted murder and homicide. 

### Analytical challenges

When harm-weighted hotspot analyses are conducted using the CCHI/CSS they can produce *'frequency deserts'* - harm-weighted hotspots where very few or just 1 event has occurred. If our intervention involves patrolling a hotspot, it might not be the best use of resources to send an officer every day to a location where a single isolated event of homicide was the only violent crime to have occurred in a 12-month or longer analytical timeframe.

So why not just use the highest weighted crimes to identify count-based hotspots? Fortunately, events of homicide, attempted murder and weapon-enabled serious wounding occur at **relatively** low levels in England and Wales. This means that few areas experience space-time clustering of higher weighted crimes within a given year, and those that do are often not stable from one year to the next. 

One approach to this problem is to draw on longer-term data and use a recency weighting, but this can still fail to produce small enough areas suitable for hotspot patrol deployments when limited to the lens of homicide, attempted murder and weapon-enabled wounding. 

Another is to include similar behavioural problems that are more frequent but lower weighted, such as wounding offences that did not involve the use of knives and firearms. This can produce another type of skew, where concentrated volumes of lower weighted events, such as bar fights in a night-time economy, moderate locations where there is a presence of both higher and lower weighted events.

Further commentary on these challenges is discussed in a recent paper by Vincent Harinam, Zeljko Bavcevic and Barak Ariel: <a href="https://crimesciencejournal.biomedcentral.com/articles/10.1186/s40163-022-00176-x" target="_blank">Spatial distribution and development trajectories of crime versus crime severity: do no abandon the count-based model just yet</a>.

### (Imperfect) solutions

The solution to removing *'frequency deserts'*, can often be manual correction. This can be a time burden for someone working in a large urban area or across an entire police force. It can involve making arbitrary cut-off decisions. What does too few offences mean? Less than 10? Less than 1 per week? Less than 1 per month? This can become an iterative loop, which can be fine for a single time study or intervention, but you do not want to rehash this manual process over and over again. 

Something I have experimented with is applying transformations to the raw CCHI/CSS values. The aim is to be able to generate hotspot information that amplifies higher weighted events without generating the frequency deserts. The table below provides an overview of weights that can be applied for a basket of violent crimes, beginning from the raw CCHI value. For example, a homicide is weighted as 5,475 using the CCHI. A log transformation of this value produces a weight of 9 and a square root transformation of this value produces a weight of 74. The count treats all crimes equally.

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



