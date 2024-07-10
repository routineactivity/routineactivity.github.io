---
title:  "Creating safe public spaces for women and girls"
layout: post
date: 2024-04-05
last_updated: 2024-04-05
tags: [crime mapping, safety, prevention]
---

_At a time when the safety of women and girls in public spaces continues to be of paramount concern, this post looks to spatial analytical methods and related responses for improving safety._

Over the last few years, I’ve completed several pieces of work exploring the safety of public spaces for women and girls. This has included developing my understanding of the risks (victim research and surveys, place-based research), the available data and its limits, testing analytical methods and attempts at linking findings to possible solutions.

Here I would like to unpack and share some of what I have learned (or found helpful) in the hope that it can help others who are committed to creating public spaces that are safe for women and girls.

### Problem

A variety of violence and aggression problems are experienced by women and girls. My focus has been on crimes involving confrontation that exhibit sexual aggression or sexual motivation. However, many confrontational behaviours, which are not sexual, can still cause a woman to fear that they could have been a target of rape or sexual assault — and this may contribute to the thinking behind the broad national definition of Violence Against Women and Girls (VAWG) for England and Wales.

The visual below, adapted from Felson and Eckert (2018), illustrates the continuum of violence and aggression experienced.

<img src="/assets/images/2024-04-05-eckert_felson.png" alt="Logo" style="width: 800px; height: auto;">

The focus of this post is the right-hand side. Specifically, sexual violence (rape, sexual assault, exposure, administering poison with intent to commit sexual offence), stalking and street harassment offences perpetrated by males against women and girls. The filters applied to generate data for these problems are broadly to:

 * locate all crimes in public places (including places accessible to the public i.e. inside licenced venues) not involving a current intimate partner or relative.
 * locate all crimes in a dwelling or other accommodation type (including hotel/BB) where the suspect is unknown or not previously acquainted.

There is no ideal way to extract the perfect data sample from administrative records.

_SELECT all records FROM perfect and pristine administrative data WHERE I get exactly what I need — does not exist._

The parameter search described above will return predominantly stranger-based offences mostly occurring in the street or an open space. S2 rapes will tend to be inside venues and private dwellings more so than outside or in public (S2 stranger rape can occur after an extended approach or interaction by the offender with their target — such as an internet-enabled meet-up or encounter at a bar or party).

This is not an instruction or communication on how you should do it. This is an analytical choice to produce a dataset of similar behaviours along a continuum to examine their spatial distributions. The problem therefore is places where male sexual violence and aggression towards women and girls occurs.

### What contributes to risk?

There are many contexts in which public spaces can present danger to women and girls, for instance:

 * In places where there is exposure to more strangers, such as a busy night-time economy or retail centre. Males loitering in public spaces can endanger, frighten and constrain the movements of women and girls — many could even avoid public spaces where men may approach or pester due to fear.
 * There are places where situational disadvantages are created — this means places where a potential target becomes stuck in the presence of an aggressive male where there is no one else around (i.e. a deserted transport node late at night).
 * Inescapable, shadowy or isolated places or places with reduced ability to see around yourself and avoid walking into danger.
 * Night and darkness can also change the patterns of danger, and those places that are safe during the day can become more dangerous at night.

Many types of places can create a feeling of unsafety, that you could be attacked by an offender who then gets away.

<img src="/assets/images/2024-04-05-risky_places.png" alt="Logo" style="width: 800px; height: auto;">

Let’s consider the offender modus operandi (MO) in the context of places. A male intent on committing the offence of sexual violence will consider ways in which they can use their surroundings to complete their crime. That may involve searching for their target in an isolated area, or near the edge of an isolated area where they can then push or pull them into it (a park, an alleyway, a car park, a vacant building). The offender may need to wait for a lull in activity if they attack in a less hidden area — this may be more likely for daytime offences.

Offenders may hone and learn the best ways to exploit the environment through previous failed attempts, stalking behaviour and other means. The location may be pre-chosen because it is isolated and convenient (for successful completion of the crime, and escape routes). You can read more about offender MO and target or area selections in Elements of Crime Patterns (<a href="https://www.amazon.co.uk/Elements-Crime-Patterns-Deborah-Osborne/dp/B0CHL1C6V8#:~:text=Book%20overview&text=This%20bookcontains%20a%20wealth,methods%20used%20to%20commit%20crimes." target="_blank">Osbourne, 2023</a>).

### Data challenges

This isn’t intended to be an exhaustive list of data challenges — those familiar with police and other public safety data (such as ambulance callouts to sexual assault) will be aware that there are messy data entries across all the event variables for us to consider (times of offending, locations, MOs, offending behaviours etc). The main points to highlight here are the high level of underreporting and limits of conventional policing and the criminal justice system (low level of suspect identification and sanction).

Sadly, one of the most significant data challenges is that confidence in reporting is extremely low. For all rape and sexual assault offences disclosed by women in the Crime Survey for England and Wales (<a href="https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/articles/natureofsexualassaultbyrapeorpenetrationenglandandwales/yearendingmarch2020#:~:text=Perpetrator%20characteristics-,In%20the%20years%20ending%20March%202017%20and%20March%202020%20combined,two%20different%20perpetrators%2C%208%25%20by" target="_blank">CSEW 2017–2020</a>), just 15.8% had told the police about their experience. The age group with the highest prevalence of victimisation, age 16–19, had the lowest reporting rates to police (10.8%). The survey does not distinguish reporting rates by how the perpetrator was known to the victim, we don’t know if reporting rates might be somewhat higher for stranger offences.

Suspect identification in predominantly stranger offences can be challenging. Women and girls are often targeted when isolated and walking alone, very often there is no physical evidence (particularly in the case of harassment and some types of assault), and no witnesses. Many offenders will find a new victim each time they go out which helps maintain their anonymity. Men who harass and target women in public spaces are seldom ever identified, apprehended and brought to justice.

Whilst these challenges are unlikely to change soon, there are consistencies in the available data that can enable us to focus on places. The reporting of sexual violence and aggression towards women in police recorded data shows stability at places or the types of place venue over time. We can use location data in our analysis to identify risky or potentially risky places. The CSEW provides location venue information about where offences occurred (park/public space, pub/club/disco, street, place of study, car park, workplace, public transport). Underreporting aside, the relative consistencies in location-type data in police records that mirror the experience of venues reported in victim-based research and surveys is something that we can explore spatially.

Identifying high-risk places can help focus efforts to maximise the impact of our work. Mapping risky locations provides a target for resources. If we identify locations most likely to experience sexual violence and aggression, then we have a target for resources. Here they can disrupt and identify perpetrators, protect potential targets (in places where offenders operate), and identify place management strategies.

### Analytical approaches

There are a variety of methods that can be applied to understand the relationship between crime events and the environment. Each method first requires data - we need:

 * Point data for crime events.
 * Point data for the environment (points of interest, i.e. bars, bus stops, clubs etc)
 * Polygon data for the environment (i.e. parks or greenspaces, retail areas)
 * Multi-line data (i.e. alleyways, footpaths)

Some examples of spatial methods are provided below. They include explanations on how the data is formatted and structured (feature engineering) in preparation for modelling:

 * Binomial Regression: <a href="https://link.springer.com/article/10.1007/s10610-022-09535-5" target="_blank">Patterns and Predictors of Stranger Rape Locations</a> — this study aggregates data to neighbourhood spatial units (Lower Super Output Areas) and performs multiple negative binomial regression models exploring events and place characteristics.
 * Geographic Weighted Regression: <a href="https://openaccess.city.ac.uk/id/eprint/28041/" target="_blank">Using geographically weighted regression to explore neighbourhood-level predictors of domestic abuse in the UK</a> — this study aggregates data to neighbourhood spatial units (Lower Super Output Areas) and performs Geographic Weighted Regression.
 * Random Forest: <a href="https://andrewpwheeler.com/2021/03/26/using-random-forests-in-arcpro-to-forecast-hot-spots/" target="_blank">Using Random Forests in ArcPro to forecast hotspots</a> — this is a walkthrough guide for exploring crime events (violence) and environmental features at the street segment level.

Essentially, each technique is used in the examples to identify variables within the environment that affect the risk of a crime event occurring. These can be local and spatial effects — factors that affect crime at a place or very near to that place, such as the location of a bar or rail underground station. They can also be neighbourhood effects and location contexts. These may include socio-ecological factors (deprivation, poverty) or other geographically referenced data.

If we aim to reduce the risk of a crime occurring close in space-time to when it occurs then we might focus on local and spatial effects at micro-geographies (like street segments or small uniform aggregated units). If we aim to understand location contexts for long-term planning and regeneration then we might consider larger spatial aggregations and neighbourhood effects.

I provide a small list of open-source software to conduct these spatial methods at the end.

The example I will share below uses a method called ‘Risk Terrain Modeling’ — RTM (see https://simsi.com/ and https://www.riskterrainmodeling.com/).

RTM is designed to identify factors that may affect the risk of crime, usually in micro spaces that represent behavioural units of analysis consistent with how people use and move through space. How this is typically done is as follows:

_1. Upload crime point data and environmental point/polygon data to RTM_

_2. RTM transforms this data into dummy variables across a user-defined fishnet grid (i.e. 100m squares)._

_3. Dummy variables are binary — for each square, a 1 will denote the presence of a variable if within 100m, 200m, or 300m (spatial bands are user-defined), and 0 is the absence of a variable within the distance thresholds. Similarly, if testing for density, each square will contain a 1 if the density exceeds a threshold (2 standard deviations), and 0 if below this threshold._

_4. A lasso regression predicts the crime outcome using the variables, then for the variables that are predictors of the crime outcome, the distance threshold with the highest coefficient is chosen (i.e. a nightclub might be risky at 100m, 200m, 300m, but the model output will only retain the highest one for in the final model output)._

The examples I provide below are from a presentation I delivered at an event in early 2022 related to the <a href="https://www.college.police.uk/article/safer-streets-fund-toolkit-updated" target="_blank">Home Office Safer Street Fund</a> for schemes to reduce violence against women and girls. This was based on exploratory work of the Southend-on-Sea built-up urban area within Essex UK. Models and risk terrains were run for street harassment, sexual violence, street harassment and sexual violence during darkness, and street harassment and sexual violence during daylight.

<img src="/assets/images/2024-04-05-.png" alt="Logo" style="width: 800px; height: auto;">

RTM outputs are different to what we usually see from prediction/forecasting techniques in that they assign a risk score to a place based on what makes it vulnerable (the diagnosis of place features), regardless of whether there have been any crime events (usually attempts are made to predict how much crime will happen in a spatial unit over a given period).

As a simple example, say we produced an RTM model for street robbery and found that off-licence/liquor stores, ATMs, night bus routes and bars were potential explanatory reasons for the patterning of street robbery. The RTM outputs would produce a relative risk score across the entire terrain (study area), helping us identify all locations where these factors could contribute to increased risk.

Some of these locations may have regular exposure to crime, others less exposure or none, and in some cases, they may be sites where people are just not bothering to report to the police. A caveat here is that RTM produces a global result. This means a risk factor is assigned the same risk value where it appears across the entire study area. In incident data, we tend to find a pareto distribution (j-curve, hockey stick curve) of crime throughout different types of risk settings with some being significantly riskier than others (a more detailed explanation can be found in <a href="https://osf.io/preprints/socarxiv/xc538" target="_blank">Wheeler & Steenbeek, 2020</a>).

If we look at the hotspot surface side-by-side with the risk terrain for Southend below, we can see better what is happening.

<img src="/assets/images/2024-04-05-risk terrain_hotspots.png" alt="Logo" style="width: 800px; height: auto;">

In our outputs for Southend, we found that features including bus routes, subway underpasses, small play parks and small car parks were places where risk increased during daylight hours. During the hours of darkness, this shifted towards nightclubs, pubs, bars and features more related to the nighttime economy.

Let’s consider some risk factors identified in a model for nighttime sexual assault in a suburban area. In this example, a bus stop is located near a wooded playing field, alleyway and bar. The bar may supply the motivated offender who is under the influence of alcohol. Leaving the bar under the cover of darkness, the offender could follow a potential target alighting at the bus stop before the alleyway. The small park and playing field provide a location for the offender to push/pull the target away from any potential witnesses or guardians.

We would hope to catch the offender and bring them to justice, although it’s likely that this event may never be reported to the police.

If it was reported, and the offender was brought to justice, it still wouldn’t address the risk which created the conditions that made it possible for the crime to be committed in the first place.

This location left unchecked can become exploited by a new offender.

How do we intervene in places using insights about place-based risks?

### How to respond?

Here is where I’d love to say — this is the silver bullet, where I provide a simple easy solution to a chronic problem.

Instead, here are some considerations based on the existing intervention literature and how it links to the outputs of a risk-terrain model.

#### 1. Crime Prevention Through Environmental Design

Below are examples of place managers with responsibility for creating safe spaces:

 * Strategic and local planning authorities
 * Highway authority
 * Design council
   
These agencies play a key role in designing and planning our environments in a way that addresses the safety risks of women and girls. See, for example, Essex County Council's design guide on <a href="https://www.essexdesignguide.co.uk/supplementary-guidance/women-and-girls-safety-in-the-public-realm/" target="_blank">Planning for Safer and More Inclusive Places for Women and Girls</a>.

Insights on place-based risks gained from spatial analyses can inform thinking towards better design. More immediately, insights can be shared by police with place managers to assist in making risk-informed prioritisation decisions regarding new lighting or security measures.

#### 2. Addressing the cumulative impact of specific risk settings

Sometimes risk is exacerbated by the concentration of particular building uses. Nightclubs are one example.

Previously, cumulative impact and local planning policies have been enacted by councils to place limits on the proportion of retail and commercial units that hold a specific type of use licence (i.e. gaming, masseuse, sexual entertainment venues, alcohol).

Insights from spatial analyses when shared can provide evidence for developing local policies to disperse or limit concentrations of higher-risk building use types.

#### 3. Regulation of places

Regulation here means prescribing rules, procedures and conditions to a venue or type of venue. Regulation is often targeted at a specific venue when it contributes disproportionately to the problem — for example, a licenced venue that experiences more drink-spiking incidents than anywhere else. Typically, venues subject to regulation are more likely to be identified using simpler analytical methods (i.e. counts of crimes by venue).

Often the police have limited authority to enact regulation of places, and can only present concerns in the <a href="https://www.camdencitizen.co.uk/2023/09/11/cultural-gem-camdens-electric-ballroom-wins-alcohol-extension-in-face-of-police-fears/#:~:text=It%20said%20extending%20its%20alcohol,future%20since%20Covid-19%E2%80%9D." target="_blank">interest of public safety</a> without having the power to make changes.

With our spatial analysis outputs, we might seek new ways of working with regulating agencies to manage risks regarding specific venue types identified. Eck et al (2023) present the alternative idea of ‘ends-focused regulation’. Two approaches proposed are:

 * Civil litigation against the owner of the building. An example might be a nightclub where numerous drink-spiking incidents are reported. In principle, the threat of action could induce place managers to invest in prevention (for evidence of effectiveness see <a href="https://www.cambridge.org/core/books/third-party-policing/D089F3A7F17546B0B753D0A6CC5DCF35" target="_blank">Mazerolle & Lansley 2005</a> & <a href="https://www.tandfonline.com/doi/abs/10.1080/07418825.2018.1438497" target="_blank">Worral & Wheeler 2018</a>)
 * Setting cap limits. The regulator places a ceiling on how many calls or crimes a premise can have. The venue is sanctioned when the cap is reached (i.e. a fine is imposed).

There are practical challenges for how ‘ends-focused regulation’ would be workable for the problem of public space sexual violence and harassment. A key consideration is that we would not want to create a situation where we suppress the need for police attention or contribute to further underreporting.

The insights can be a conversation starter with regulators about how we might better mitigate risks at specific venue types.

#### 4. Familiarise yourself with response literature (POP, EBP, etc)

It’s not easy, but spending time reviewing the response literature regarding a problem is going to help in being able to connect insights with action.

Below are some useful resources for both place and people-based responses. It might be that we focus people-based approaches in our high-risk places around our high-risk features or venue types (i.e. targeted places for Project Vigilant and <a href="https://www.met.police.uk/advice/advice-and-information/fr/facial-recognition-technology/" target="_blank">Live Facial Recognition</a>).

 * <a href="https://popcenter.asu.edu/content/acquaintance-rape-college-students-2nd-ed" target="_blank">Acquaintance rape of students pop guide</a>
 * <a href="https://cebcp.org/evidence-based-policing/the-matrix/" target="_blank">Evidence-Based Policing Matrix</a>
 * <a href="https://www.college.police.uk/guidance/interventions-reduce-violence-against-women-and-girls-vawg-public-spaces" target="_blank">Interventions to reduce VAWG in public spaces College of Policing</a>
 * <a href="https://popcenter.asu.edu/content/monitoring-offenders-conditional-release" target="_blank">Monitoring offenders on conditional release response guide</a>
 * <a href="https://www.college.police.uk/support-forces/practices/disrupting-predatory-behaviour-night-time-economy-project-vigilant" target="_blank">Project Vigilant College of Policing</a>
 * <a href="https://popcenter.asu.edu/content/sexual-assault-women-strangers-0" target="_blank">Sexual Assault of women by strangers pop guide</a>
 * <a href="https://popcenter.asu.edu/content/stalking-0" target="_blank">Stalking pop guide</a>
 * <a href="https://popcenter.asu.edu/content/using-cpted-problem-solving" target="_blank">Using CPTED in Problem Solving tool guide</a>
 * <a href="https://popcenter.asu.edu/content/video-surveillance-public-places-2nd-edition" target="_blank">Video surveillance of public spaces response guide</a>

#### 5. Populating a General Problem-Solving Matrix

Finally, below is an example of a problem-solving response framework for sexual crimes in transit environments (which I grabbed some time ago from Twitter/X). It is titled the General Problem-Solving Matrix (GPSM).

This framework can help you to align analytical insights with response literature and to think about who is best placed to respond, how and when.

<img src="/assets/images/2024-04-05-gpsm.jpg" alt="Logo" style="width: 800px; height: auto;">

### Further reading

 * <a href="https://andrewpwheeler.com/2021/03/26/using-random-forests-in-arcpro-to-forecast-hot-spots/" target="_blank">Using Random Forests in ArcPro to forecast hot spots (andrewwheeler.com)</a>
 * <a href="https://link.springer.com/book/10.1007/978-3-031-27693-4#:~:text=Created%20by%20property%20owners%2C%20place,proportion%20of%20addresses%20and%20facilities." target="_blank">Eck, J et al (2023) Place Management and Crime</a>
 * <a href="https://link.springer.com/article/10.1007/s10610-022-09535-5" target="_blank">Lundigran, S. et al (2022) Patterns and Predictors of Stranger Rape Locations</a>
 * <a href="https://www.amazon.co.uk/Elements-Crime-Patterns-Deborah-Osborne/dp/B0CHL1C6V8#:~:text=Book%20overview&text=This%20bookcontains%20a%20wealth,methods%20used%20to%20commit%20crimes." target="_blank">Osbourne, D. (2023) Elements of crime patterns</a>
 * <a href="https://openaccess.city.ac.uk/id/eprint/28041/" target="_blank">Weir, R. (2019) Using geographically weighted regression to explore neighborhood-level predictors of domestic abuse in the UK</a>
 * <a href="https://osf.io/preprints/socarxiv/xc538" target="_blank">Wheeler, A. & Steenbeek, W. (2020) Mapping the risk terrain for crime using machine learning</a>

### Free open-source spatial regression and forecasting

 * Geospatial Data Science stack https://darribas.org/gds_env/stacks/
 * GeoDA https://geodacenter.github.io/
 * MGWR https://sgsup.asu.edu/sparc/multiscale-gwr

### Place features and points of interest data sources

 * <a href="https://www.link.co.uk/consumers/locator/" target="_blank">ATM Locator</a> 
 * <a href="https://data.food.gov.uk/catalog/datasets/38dd8d6a-5ab1-4f50-b753-ab33288e3200" target="_blank">Food Standards Agency (eating and drinking places)</a> 
 * <a href="https://www.gamblingcommission.gov.uk/public-register" target="_blank">Gambling business and licences</a> 
 * <a href="http://download.geofabrik.de/europe/great-britain/england/greater-london.html" target="_blank">Open Street Map downloads</a> 
 * <a href="https://osdatahub.os.uk/downloads/open" target="_blank">OS Data Hub</a> 
 * <a href="https://en.parkopedia.co.uk/" target="_blank">Parkopedia car park locator</a> 

   <br>

I originally posted this on [medium](https://medium.com/@routineactivity85/creating-safe-public-spaces-for-women-and-girls-a202bd9b2bfb).
