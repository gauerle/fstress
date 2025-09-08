---
title: "The OFR Financial Stress Index"
authors: Phillip J. Monin
year: 2019
doi: 10.3390/risks7010025
url: https://www.mdpi.com/2227-9091/7/1/25
citekey: monin2019
type: journalArticle
journal: Risks
abstract: "We introduce a financial stress index that was developed by the Office of Financial Research (OFR FSI) and detail its purpose, construction, interpretation, and use in financial market monitoring. The index employs a novel and flexible methodology using daily data from global financial markets. Analysis for the 2000–2018 time period is presented. Using a logistic regression framework and dates of government intervention in the financial system as a proxy for stress events, we found that the OFR FSI performs well in identifying systemic financial stress. In addition, we find that the OFR FSI leads the Chicago Fed National Activity Index in a Granger causality analysis, suggesting that increases in financial stress help predict decreases in economic activity."
created: 2025-05-26
modified: 2025-05-26
tags: 
  - source
---

# The OFR Financial Stress Index

%% begin summary %%

## Summary

Financial stress doesn't have a common definition, while some authors define it as a materialization of a systemic risk or the product of the interaction between vulnerabilities. The broad definition suggested here is that financial stress is the disruption to the normal functioning of financial markets. It involves at least one of these:
- Increased asymmetry of information
- Increased uncertainty about the fundamental value of assets or the behavior of investors
- Decreased willingness to hold risky or illiquid assets

A financial stress index (FSI) is a univariate timeseries that aggregates information from a set of indicators that measure the severity and nature of stress as it occurs. It informs what is the state of the financial system. Although related, it doesn't measure economic vulnerability. Previously used indicators include measures of volatility, credit spreads, funding spreads, and interest rates.

The OFR FSI is daily snapshot of systemic financial stress across the globe, based on more than 30 contemporary and historical indicators. It uses dynamic weighting scheme to change the contribution of each indicator on the basis of its importance to market participants. In this index, the indicators have different categories: credit spreads (e.g. BaML US Corporate Master), equity valuation (e.g. NIKKEI 225 Index), Funding (e.g. 3-month EURIBOR-EONIA), and safe assets (e.g. Gold/USD Real Spot Exchange Rate). The OFR FSI scale proved to be able to coincide with major historical financial crisis across the globe since 2000. 


%% end summary %%

---

## Annotations

### Previous theory and evidence
%% begin previous-theory %%







> [!quote]- monin2019 - [p. 1](zotero://open-pdf/library/items/LT6U2TAD?page=1&annotation=TIHU8HIH)
> FSI measures the severity and nature of stress as it occurs. Vulnerabilities can build during periods of low stress
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 2](zotero://open-pdf/library/items/LT6U2TAD?page=2&annotation=9EF2RRXY)
> Stress and vulnerabilities should therefore be measured separately.
> 
> *Annotated on: 2025-05-26*






























> [!quote]- monin2019 - [p. 3](zotero://open-pdf/library/items/LT6U2TAD?page=3&annotation=9KH6IATR)
> Some researchers define financial stress as being directly related to financial market functioning (Carlson et al. 2012; Sandahl et al. 2011). Others define stress indirectly as “systemic risk which has materialized” (Louzis and Vouldis 2013) or as the product of the interactions between vulnerabilities in markets and shocks (Grimaldi 2010, 2011).
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 3](zotero://open-pdf/library/items/LT6U2TAD?page=3&annotation=Q7GKAMG8)
> this motivates the following definition: financial stress refers to disruptions to the normal functioning of financial markets
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 3](zotero://open-pdf/library/items/LT6U2TAD?page=3&annotation=QFDXAPK5)
> financial stress is characterized by the coincident manifestation of one or more of the following
> 
> **Note:**
> - Increased uncertainty about the fundamental value of assets or the behavior of investors- Increased asymmetry of information
>- Decreased willingness to hold risky assets
>- Decreased willingness to hold illiquid assets
> *Annotated on: 2025-05-26*






> [!quote]- monin2019 - [p. 4](zotero://open-pdf/library/items/LT6U2TAD?page=4&annotation=E8JHSBPM)
> A financial stress index is a univariate time series that aggregates the information in these indicators and isolates and measures the level of financial stress
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 4](zotero://open-pdf/library/items/LT6U2TAD?page=4&annotation=MP8C5C5E)
> FSIs are concerned with distress or instability in the financial system without explicit regard for how such distress may manifest in the real economy.
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 4](zotero://open-pdf/library/items/LT6U2TAD?page=4&annotation=MUT6YBKS)
> constructed FSIs to examine the relationship between financial stress and macroeconomic variables (Apostolakis and Papadopoulos 2019) or exchange rates (Adam et al. 2018)
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 5](zotero://open-pdf/library/items/LT6U2TAD?page=5&annotation=I824FVJW)
> Common types of indicators included are measures of volatility, credit spreads, funding spreads, and interest rates
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 5](zotero://open-pdf/library/items/LT6U2TAD?page=5&annotation=SNITSGPZ)
> The post-crisis environment has also been fertile ground for development of systemic risk indicators, or SRIs. SRIs measure vulnerabilities rather than stress.
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 5](zotero://open-pdf/library/items/LT6U2TAD?page=5&annotation=7MMBB5LD)
> an FSI indicates what the state of the financial system is, and an SRI expresses what happens if the state of the financial system contains a specific stress event
> 
> *Annotated on: 2025-05-26*






> [!quote]- monin2019 - [p. 15](zotero://open-pdf/library/items/LT6U2TAD?page=15&annotation=DEX73KFC)
> One of the motivations in measuring financial stress is that it can have adverse real economic effects.
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 15](zotero://open-pdf/library/items/LT6U2TAD?page=15&annotation=M2CHF7HJ)
> Financial stress, as measured by other FSIs, can forecast declines in economic activity
> 
> *Annotated on: 2025-05-26*























%% end previous-theory %%

### New evidence from the article
%% begin new-evidence %%





























































> [!quote]- monin2019 - [p. 17](zotero://open-pdf/library/items/LT6U2TAD?page=17&annotation=66ZULSJE)
> The OFR FSI is an entry point for financial market monitoring, not a sufficient statistic for understanding financial markets or financial stress events. It is a coincident indicator of stress in the financial system, not necessarily a leading indicator or predictor of financial stress events.
> 
> *Annotated on: 2025-05-26*





















%% end new-evidence %%

### Characteristics from the article
%% begin characteristics %%





> [!quote]- monin2019 - [p. 1](zotero://open-pdf/library/items/LT6U2TAD?page=1&annotation=X9V5ZPU3)
> The OFR FSI is a daily, market-based snapshot of systemic financial stress in global financial markets available to policymakers at the Financial Stability Oversight Council, its member agencies, the financial industry, Congress, and the public. The index distills information embedded in more than 30 indicators into a summary measure of systemic financial stress. It can be decomposed into five categories of indicators or three regions, allowing users to drill down into the drivers of financial stress
> 
> *Annotated on: 2025-05-26*








> [!quote]- monin2019 - [p. 2](zotero://open-pdf/library/items/LT6U2TAD?page=2&annotation=QYXDIQ59)
> OFR FSI is distinguished from other FSIs2 by its global scope, daily frequency, dynamic weighting scheme, transparent and methodical construction, and its ability to be decomposed into indicator categories and regions
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 2](zotero://open-pdf/library/items/LT6U2TAD?page=2&annotation=S543P4E4)
> OFR FSI’s value on a given day depends only on information available that day and, once estimated, its value does not change
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 2](zotero://open-pdf/library/items/LT6U2TAD?page=2&annotation=CGSZEADF)
> OFR FSI’s methodology also accommodates input indicators of differing historical timespans
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 2](zotero://open-pdf/library/items/LT6U2TAD?page=2&annotation=HZQ59CZK)
> indicators that cease to reflect market participants’ views about financial stress can be removed and replaced
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 2](zotero://open-pdf/library/items/LT6U2TAD?page=2&annotation=V5FSAJY3)
> OFR FSI on a given date is proportional to the weighted average of the marginal contributions to financial stress of its constituent indicators
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 2](zotero://open-pdf/library/items/LT6U2TAD?page=2&annotation=UINICQWT)
> weights and the signs of indicators’ stress contributions are determined using a dynamic factor model with a single latent factor, which essentially corresponds to the first principal component from a principal component analysis
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 2](zotero://open-pdf/library/items/LT6U2TAD?page=2&annotation=2NCK8CD7)
> We define financial stress as disruptions in the typical functioning of financial markets.
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 2](zotero://open-pdf/library/items/LT6U2TAD?page=2&annotation=ZIISXGZX)
> Symptoms of financial stress are informed by both theory and practice, and include: uncertainty about the fundamental value of financial assets or the behavior of investors; increased asymmetric information; and a decreased willingness to hold risky or illiquid assets
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 2](zotero://open-pdf/library/items/LT6U2TAD?page=2&annotation=RQNMKV98)
> over 30 global financial market indicators, such as implied volatility indexes, yield spreads, valuation measures, and interest rates that are available with varying historical timespans at a daily frequency from publicly available sources
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 2](zotero://open-pdf/library/items/LT6U2TAD?page=2&annotation=THHK37AR)
> The index is intended to capture systemic financial stress, which occurs when exogenous shocks or contagion effects occur in multiple markets simultaneously
> 
> *Annotated on: 2025-05-26*








> [!quote]- monin2019 - [p. 3](zotero://open-pdf/library/items/LT6U2TAD?page=3&annotation=TUZE44JI)
> The indicator categories are credit spreads, equity valuation, funding, safe assets, and volatility.
> 
> *Annotated on: 2025-05-26*






















> [!quote]- monin2019 - [p. 6](zotero://open-pdf/library/items/LT6U2TAD?page=6&annotation=5K3JTLX9)
> 
> 
> *Annotated on: 2025-05-26*










> [!quote]- monin2019 - [p. 17](zotero://open-pdf/library/items/LT6U2TAD?page=17&annotation=YA4HIS7N)
> 
> 
> *Annotated on: 2025-05-26*



















%% end characteristics %%

### Research gaps
%% begin research-gaps %%
















































































%% end research-gaps %%

### Further reading
%% begin further-reading %%


































> [!quote]- monin2019 - [p. 20](zotero://open-pdf/library/items/LT6U2TAD?page=20&annotation=Y633BRQU)
> Adam, Tomáš, Sonˇ a Benecká, and Jakub Mateˇju ̊. 2018. Financial stress and its non-linear impact on CEE exchange rates. Journal of Financial Stability 36: 346–60. [CrossRef]
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 20](zotero://open-pdf/library/items/LT6U2TAD?page=20&annotation=9WQNE43G)
> Apostolakis, George, and Athanasios P. Papadopoulos. 2019. Financial Stability, Monetary Stability and Growth: A PVAR Analysis. Open Economies Review 30: 157–78. [CrossRef]
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 20](zotero://open-pdf/library/items/LT6U2TAD?page=20&annotation=77ZR6FJS)
> Carlson, Mark, Kurt Lewis, and William Nelson. 2012. Using Policy Intervention to Identify Financial Stress. Finance and Economics Discussion Series Working Paper 2012-02, Federal Reserve Board, Washington, DC, USA. January 10
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 20](zotero://open-pdf/library/items/LT6U2TAD?page=20&annotation=RQDFGUKC)
> Grimaldi, Marianna B. 2010. Detecting and Interpreting Financial Stress in the Euro Area. ECB Working Paper Series No. 1214, European Central Bank, Frankfurt, Germany. June.
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 20](zotero://open-pdf/library/items/LT6U2TAD?page=20&annotation=CL4XKKYK)
> Hakkio, Craig S., and William R. Keeton. 2009. Financial stress: What is it, how can it be measured, and why does it matter? Economic Review 94: 5–52.
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 21](zotero://open-pdf/library/items/LT6U2TAD?page=21&annotation=A3BY9DJ9)
> Illing, Mark, and Ying Liu. 2006. Measuring Financial Stress in a Developed Country: An Application to Canada. Journal of Financial Stability 2: 243–65. [CrossRef]
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 21](zotero://open-pdf/library/items/LT6U2TAD?page=21&annotation=KSP8Y543)
> Louzis, Dimitrios P., and Angelos T. Vouldis. 2013. A Financial Systemic Stress Index for Greece. ECB Working Paper No 1563, European Central Bank, Frankfurt, Germany. July.
> 
> *Annotated on: 2025-05-26*




> [!quote]- monin2019 - [p. 21](zotero://open-pdf/library/items/LT6U2TAD?page=21&annotation=ZC4B6HWU)
> Sandahl, Johannes F., Mia Holmfeldt, Anders Rydén, and Maria Strömqvist. 2011. An Index of Financial Stress for Sweden. Sveriges Riksbank Economic Review 2: 49–67
> 
> *Annotated on: 2025-05-26*



%% end further-reading %%

%% Import Date: 2025-05-26T17:52:55.463-03:00 %%
