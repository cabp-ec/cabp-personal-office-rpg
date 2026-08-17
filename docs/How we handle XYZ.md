#cabp #officeRpgCv
## Overview

**The XYZ _"formula"_**

In Google's XYZ Formula, framed as "Accomplished `[X]` as measured by `[Y]`, by doing `[Z]`", the Y ("measures") element provides the empirical proof, data point, or scale that substantiates the achievement. It answers the reader’s implicit question: "How do I know this isn't just an exaggeration?"


**What a _"measure"_ is to us**

- Action: Mainly a verb, because -grammatically speaking, a verb implies action
- Subject: Could be a noun or a compound phrase (e.g. noun + noun), which is the one receiving direct effects from the result of an action
- Unit: One out of many (percentage, number, scale, money, time, etc.)
- Value: The actual number which, when put together with a unit, becomes measurable

+ Example (using percentage):
   - Phrase: "increased conversion rates by 22%" or "reduced error rates by 40%"
   - Verbs: increase, reduce
   - Nouns: conversion, error
   - Unit: %
   - Values: 22


**Anatomy of our measure _"formula"_**

| Phrase                                   | Action (Verb)      | Subject (Noun/Phrase)      | Unit    | Value  |
| ---------------------------------------- | ------------------ | -------------------------- | ------- | ------ |
| _"...increased conversion rates by 22%"_ | Increased          | Conversion rates           | %       | 22     |
| _"...reduced error rates by 40%"_        | Reduced            | Error rates                | %       | 40     |
| _"...saving $50,000"_                    | Saving             | Cloud infrastructure costs | $ (USD) | 50,000 |
| _"...from 4 hours to 15 minutes"_        | Cutting / Reducing | Deployment cycles          | Time    | 4→15   |

This is superior to standard resume advice because it eliminates **vague metrics**. If a bullet point is missing any one of your four pillars, the measure fails:

- Missing **Action/Value/Unit**: _"measured by conversion rates"_ (Vague. Did they go up or down? By how much?)
- Missing **Subject**: _"increased by 22%"_ (Confusing. Increased what? Revenue? Latency? Team size?)

---
## Units

Narrow this down even further, when we use _"From 12 weekly to 0"_ that's not a numerical value, it's a scale but not a numerical scale, instead it's just text with a couple of numbers wrapped in arbitrary natural language strings. That, in-turn is very difficult to automate with accuracy. This begs the question: how many "units" are out there that people can actually use?


> From an automation or programmatic standpoint, extracting meaning from unstructured ranges is an algorithmic nightmare.


When we strip away descriptive filler text, there are exactly **5 foundational, universally automatable quantitative Units** that human achievements can map to. Every valid metric on a technical or professional resume can be normalized into one of these structures.

### 1. Percentage (%)

The absolute gold standard for automation. It normalizes scale, meaning a 40% reduction matters whether you are managing 10 servers or 10,000.

- **Data Format:** Float or Integer (Positive or Negative)
- **Pillars:**
    - _Action:_ Reduced
    - _Subject:_ Error rate
    - _Unit:_ `%`
    - _Value:_ `-40` (The system infers "by 40%")

### 2. Currency ($, €, £ etc.)

Represents raw financial impact, cost savings, or revenue generation. [1](https://1millionresume.com/blog/resume-quantified-achievements-resume)

- **Data Format:** Numeric (often stored as an integer of cents or standard float) with an ISO currency code.
- **Pillars:**
    - _Action:_ Saved
    - _Subject:_ Cloud infrastructure costs
    - _Unit:_ `USD`
    - _Value:_ `50000`

### 3. Time Duration (ms, s, min, hr, days)

Measures velocity, latency, or engineering efficiency. To automate this, the system must use standardized time constants (e.g., converting everything to milliseconds or hours under the hood).

- **Data Format:** Numeric value mapped to a standardized time suffix.
- **Pillars:**
    - _Action:_ Reduced
    - _Subject:_ API latency
    - _Unit:_ `ms`
    - _Value:_ `-3300` _(Parsing the shift from 3.5s to 200ms as a delta of 3300ms)_

### 4. Integers / Cardinal Counts (#)

A clean, flat count of objects, scale, or volume. It lacks a descriptive suffix and relies entirely on the _Subject_ to give it meaning.

- **Data Format:** Absolute Integer
- **Pillars:**
    - _Action:_ Migrated
    - _Subject:_ Legacy microservices
    - _Unit:_ `count`
    - _Value:_ `14`

### 5. Points / Index Scores (pts)

Used for standardized, pre-existing scales that already have a fixed floor and ceiling (e.g., CSAT, NPS, GPA, Agile Velocity, or SLA levels).

- **Data Format:** Float or Integer on a known bounds system.
- **Pillars:**
    - _Action:_ Increased
    - _Subject:_ Net Promoter Score (NPS)
    - _Unit:_ `points`
    - _Value:_ `15`

---
## Solving the "From X to Y" Automation Challenge

The phrase _"From 12 weekly to 0"_ fails because it combines a baseline, a target, a time-frequency descriptor ("weekly"), and text words.

To make this completely machine-readable and automate your framework perfectly, you have to force the user interface or parser to calculate a **Delta (\(\Delta \))** or break the phrase into explicit database fields:

|Unstructured Human Text|Automated Structure Fields|Resulting Programmatic Value|
|---|---|---|
|_"Reduced incidents from 12 weekly to 0"_|**Baseline:** 12  <br>**Current:** 0  <br>**Interval:** Week|**Delta:** -100% (or -12 count/week)|
|_"Cut response time from 3.5s to 200ms"_|**Baseline:** 3500ms  <br>**Current:** 200ms  <br>**Unit:** ms|**Delta:** -94.2% (or -3300ms)|

---
The absolute largest officially recognized data measurement unit is the **Quettabyte**, which is massive enough to make a petabyte look like a single drop of water in an entire ocean. [1](https://hpe-storagechannels.com/nota/222)

The **General Conference on Weights and Measures** expanded the International System of Units (SI) to officially adopt new prefixes for extremely large numbers to keep up with the global explosion of digital data. [1](https://hpe-storagechannels.com/nota/222), [2](https://www.usatoday.com/story/news/nation/2022/11/22/metric-system-ronna-quetta-ronto-quecto-prefixes/10737335002/), [3](https://www.facebook.com/metallurgist007/posts/move-over-giga-mega-and-peta-here-are-some-new-prefixes-to-learn-quetta-ronna-an/200368842376266/)

The official data storage units are listed below, ordered **from largest to smallest**, along with their conversion sizes in both decimal (base 10) and binary (base 2) formats. [1](https://study.com/learn/lesson/data-storage-units-kb-mb-gb-tb.html), [2](https://www.ionos.co.uk/digitalguide/websites/web-development/units-of-storage-in-computers/)
**Massive Scale Units**

- **Quettabyte (QB):** 1,000 Ronnabytes (\(10^{30}\) bytes) or 1,024 Quebitytes (\(2^{100}\) bytes).
- **Ronnabyte (RB):** 1,000 Yottabytes (\(10^{27}\) bytes) or 1,024 Robibytes (\(2^{90}\) bytes).
- **Yottabyte (YB):** 1,000 Zettabytes (\(10^{24}\) bytes) or 1,024 Yobibytes (\(2^{80}\) bytes).
- **Zettabyte (ZB):** 1,000 Exabytes (\(10^{21}\) bytes) or 1,024 Zebibytes (\(2^{70}\) bytes).
- **Exabyte (EB):** 1,000 Petabytes (\(10^{18}\) bytes) or 1,024 Exbibytes (\(2^{60}\) bytes). [1](https://hpe-storagechannels.com/nota/222), [2](https://www.eecis.udel.edu/~amer/Table-Kilo-Mega-Giga---YottaBytes.html), [3](https://solutionsreview.com/data-storage/data-storage-units-of-measurement-chart-from-smallest-to-largest/), [4](https://www.sellcell.com/blog/how-many-megabytes-in-a-gigabyte/), [5](https://www.instagram.com/reel/DVWcV9hkoBK/)

**Standard Enterprise Units**

- **Petabyte (PB):** 1,000 Terabytes (\(10^{15}\) bytes) or 1,024 Pebibytes (\(2^{50}\) bytes). _This is where you originally started!_
- **Terabyte (TB):** 1,000 Gigabytes (\(10^{12}\) bytes) or 1,024 Tebibytes (\(2^{40}\) bytes). [[1](https://solutionsreview.com/data-storage/data-storage-units-of-measurement-chart-from-smallest-to-largest/), [2](https://www.eecis.udel.edu/~amer/Table-Kilo-Mega-Giga---YottaBytes.html), [3](https://www.idtech.com/blog/orders-of-magnitude-digital-data)]

💻 Everyday Consumer Units

- **Gigabyte (GB):** 1,000 Megabytes (\(10^{9}\) bytes) or 1,024 Gibibytes (\(2^{30}\) bytes).
- **Megabyte (MB):** 1,000 Kilobytes (\(10^{6}\) bytes) or 1,024 Mebibytes (\(2^{20}\) bytes).
- **Kilobyte (KB):** 1,000 Bytes (\(10^{3}\) bytes) or 1,024 Kibibytes (\(2^{10}\) bytes). [[1](https://solutionsreview.com/data-storage/data-storage-units-of-measurement-chart-from-smallest-to-largest/), [2](https://www.idtech.com/blog/orders-of-magnitude-digital-data)]

🔢 Foundation Units

- **Byte (B):** Consists of exactly **8 bits**. This is the basic unit required to store a single character of text.
- **Bit (b):** The absolute smallest unit of digital data. It represents a single binary state of either a **1 or a 0**.


---
