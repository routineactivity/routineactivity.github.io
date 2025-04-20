---
title:  "Rare crimes spike finder (powerBI)"
layout: post
date: 2024-06-18
last_updated: 2025-04-20
tags: [powerbi]
---

_This short post is inspired by the Crime De-Coder blog article <a href="https://crimede-coder.com/blogposts/2024/SimpleRule" target="_blank">'A simple rule to identify if rare crimes have spiked'.</a>_

_I thought I would try and do something similar in Microsoft PowerBI as I’ve seen PBI being used for public-facing reports by numerous law enforcement agencies in the UK and elsewhere._

1. Connect to your data. In this example, I directly connect to London homicide data from the <a href="https://data.london.gov.uk/dataset/mps-homicide-dashboard-data" target="_blank">Greater London Authority Data Store</a>. You can add this to PowerBI using ‘Web’ to get data, and provide it the URL.
   
2. Create a simple count table. In this example, we are using just homicide, but it could include a category column if you wanted to create distributions for a selection of crime types on the fly. Below is how the simple count table looks in PowerBI.

<img src="/assets/images/pbi_pmf_table.png" alt="Logo" style="width: 800px; height: auto;">

3. Create a ‘PoissonRange’ table — this will be the x-axis of your visual. You can do this on the modelling tab in PBI by selecting the ‘New table’ icon. Generate a table using DAX

```
PoissonRange = GENERATESERIES(0, 30, 1)
```
   
4. Generate the mean value of the data series. In the example below, I use the calendar year 2022 count.

```
MonthlyMean = AVERAGE(Monthly_Counts[2022])
```

5. Create a measure that will calculate the PMF from your data

```
PoissonPMF = 
VAR mean = [MonthlyMean]
VAR x = MAX(PoissonRange[Value])
RETURN
IF(
    x < 0,
    BLANK(),
    EXP(-mean) * POWER(mean, x) / FACT(x)
)
```

6. Create a measure for the actual distribution. In this example, I use data for the 2023 calendar year.

```
ActualDistribution = 
CALCULATE(
    COUNTROWS(Monthly_Counts),
    FILTER(Monthly_Counts, Monthly_Counts[2023] = MAX(PoissonRange[Value]))
)
```

7. Display using the ‘Line and Stacked Column Chart’ visual.

<img src="/assets/images/pbi_pmf_chart.png" alt="Logo" style="width: 800px; height: auto;">
