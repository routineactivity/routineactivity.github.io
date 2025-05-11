---
title:  "Visualising Crime Along Routes: Robbery density along London's Oxford Street"
layout: post
date: 2025-05-11
last_updated: 2025-05-11
tags: [crime-mapping, robbery, hot-routes]
---

# Visualising Crime Along Routes

This example visualises the **density of robbery along Oxford Street in London**, using open data from [police.uk](https://data.police.uk/).

It’s inspired by the work of **Alasdair Rae**, who previously shared a technique for mapping elevation profiles along rail and road routes. This is a variation on that approach, applied to crime data for **‘hot route’ analysis**.

The map was created quickly and easily in **QGIS**, using the *marker* and *line geometry generators* to show incident density along the route.

<img src="https://raw.githubusercontent.com/routineactivity/routineactivity.github.io/master/assets/images/robbery_density_london_oxford_st.png" width="750" alt="Robbery Density along Oxford Street">

## How to Replicate

1. Create points along a line at equal intervals.
2. Assign values to those points — in this example, values were sampled from a heatmap of robbery incidents using **'Sample Raster Values'**.
3. Use the following expressions in the **geometry generator** to visualize the values:

### Marker Geometry Generator

```
make_point(x($geometry), y($geometry) + "YourValueColumn" * 10)
```

### Line Geometry Generator

```
make_line(
  $geometry,
  make_point(x($geometry), y($geometry) + "YourValueColumn" * 10)
)
```
---

🔗 Tools used: [QGIS](https://qgis.org)  
📊 Data source: [data.police.uk](https://data.police.uk)  
💡 Concept credit: [Alasdair Rae](https://twitter.com/undertheraedar)

The written content of this page was enhanced for flow and layout using ChatGPT.
