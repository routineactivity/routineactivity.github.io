---
title:  "OSINT: From Raw Text to Strategic Intelligence Assessment with Databricks"
layout: post
date: 2025-10-12
last_updated: 2026-09-06
tags: [llm, crime analysis, osint]
---

# OSINT: From Raw Text to Strategic Intelligence Assessment with Databricks

*Published 12 October 2025*

In law enforcement intelligence, analysts are often required to produce intelligence assessments — drawing from human, technical, or signal sources to inform operational or strategic decisions. While many assessments are case- or criminal organisation-specific, this example focuses on a strategic assessment: deriving insights from unstructured text about Camorra activity in Naples.

The objective is to produce a high-level profile of the organised crime groups (OCGs), their alliances, territorial control, and methods of operation, and to identify potential disruption opportunities, using unstructured data available publicly online.

There are many applications of Open Source Intelligence (OSINT), but here it’s narrowly focused: collating large volumes of unstructured internet text and using open-source tools to summarise and transform that text into structured intelligence suitable for analysis and assessment.

This approach aligns with the traditional intelligence cycle:

- **Define the Problem** — We seek a strategic overview of Camorra threats in Naples.
- **Plan** — Identify key intelligence questions and potential open-source data (media reporting, court summaries) within specific temporal and geographic bounds (Naples, 2024).
- **Collect** — Data collection is not covered here in detail, but it typically demands significant effort. For this walkthrough, I use a pre-compiled dataset from the Italian Anti-Mafia Directorate (DIA) annual reports.
- **Analyse** — Refine, process, and interpret the raw data to identify actors, alliances, territories, and tactics.
- **Disseminate** — Communicate findings in an intelligence product.

In this use, the collection and analysis stages are where automation can offer the most value. Traditionally, analysts manually scrape, read, translate, interpret, and thematically code each piece of data — an iterative, labour-intensive process.

Here, the goal is to automate parts of that process using Databricks Notebooks and a LLM model serving endpoint. To reproduce this example, you would need to sign up for the [Databricks Free Edition](https://www.databricks.com/learn/free-edition).

Before proceeding with the brief walk-through below, there are some limitations and considerations which must also be designed and thought into prompts and automated workflows. The example in this article is illustrative to highlight the art of the possible in a specific and relatively low-risk use case.

## ⚠️ Limitations and Considerations

While the following workflow demonstrates how a large language model (LLM) can rapidly summarise unstructured text, it should not be mistaken for analytical judgment. There are several caveats to acknowledge, particularly in a law enforcement context:

### 1. Unknown Data Provenance

LLMs have no visibility into the credibility or reliability of source material. They treat all text as input data, regardless of its origin, bias, or accuracy.

### 2. Loss of Context and Nuance

A human analyst draws meaning from tone, motive, and omission — elements that a model cannot reliably infer. Subtle distinctions between fact, rumour, and deliberate misinformation may be lost.

### 3. No Assessment of Reliability or Confidence

Intelligence assessments depend on structured evaluations (e.g., 5x5x5 grading or source evaluation frameworks). An LLM’s outputs lack any metadata about confidence or verifiability, particularly with vast open sources.

### 4. Risk of Hallucination or Overgeneralisation

Models may invent plausible-sounding statements or misattribute activities. Without human verification, these errors can distort the analytical picture.

### 5. Legal and Ethical Implications

Any AI-assisted output must remain advisory. It cannot be used as evidence or a substitute for properly sourced intelligence products.

### 6. Operational Security

Text submitted to external model endpoints may leave your control. Always check data handling and hosting locations before processing sensitive information.

In short, automation can accelerate some types of product development within the intelligence cycle, but the assessment remains inherently human. LLMs are tools to support sense-making — not to replace the professional reasoning, contextual knowledge, and ethical responsibility of an intelligence analyst.

## 🧱 Example walkthrough in Databricks Free

### Step 1: Upload the Text File to Databricks Volumes

Databricks Volumes provide managed storage that notebooks can read and write from directly. To upload a local `.txt` file (for example `napoli_amd_report_202412.txt`):

1. In the Databricks workspace sidebar, open **Catalog → Volumes**.
2. Choose or create a Catalog (e.g., `workspace`) and Schema (e.g., `osint_intell`).
3. Click **Create Volume → Upload File**.
4. Name the volume (e.g., `unstructured_data`) and upload your `.txt` file.
5. Once uploaded, Databricks will give you a path, as shown below.
6. Verify access to the path in a notebook in Databricks:

```text
/Volumes/workspace/osint_intell/unstructured_data/napoli_amd_report_202412.txt
```

```python
df = spark.read.text(
    "/Volumes/workspace/osint_intell/unstructured_data/napoli_amd_report_202412.txt"
)
display(df.limit(5))
```

This ensures your unstructured text is securely stored and easily accessible to Spark. A copy of this file is saved [here on GitHub](https://github.com/routineactivity/adhoc_notebooks/blob/main/osint_intell_report/napoli_amd_report_202412.txt).

### Step 2: Select a model serving endpoint

Databricks provides several foundation model endpoints that can be invoked directly — no deployment or setup required. These include general-purpose models such as `databricks-gpt-3.5`, `databricks-dbrx-instruct`, and `databricks-gpt-oss-120b`.

To use one:

1. In the sidebar, go to **Machine Learning → Model Serving**.
2. Browse the list of available foundation model endpoints (usually prefixed with `databricks-`).
3. Choose a suitable model.
4. Copy its REST API URL.
5. Create a personal access token: click your profile icon → **User Settings → Developer → Access Tokens → Generate New Token**. Store it securely; you’ll need it for authentication.
6. Test the endpoint in a notebook.

<!-- IMAGE PLACEHOLDER 1
Upload the Databricks Model Serving screenshot and update the filename below.
-->
![Databricks model serving endpoint – replace with uploaded image](images/osint-databricks-model-serving.png)

A REST API URL will look something like:

```text
https://dbc-xxxx.cloud.databricks.com/serving-endpoints/databricks-gpt-oss-120b/invocations
```

To test the endpoint in a notebook, use the code below. If you receive a valid JSON response containing generated text, the endpoint is live and ready to process your dataset.

```python
import requests, json

endpoint_url = (
    "https://dbc-xxxx.cloud.databricks.com/"
    "serving-endpoints/databricks-gpt-oss-120b/invocations"
)

DATABRICKS_TOKEN = "YOUR_TOKEN"

payload = {
    "messages": [
        {
            "role": "user",
            "content": "Summarise this text: Camorra activities in Naples"
        }
    ]
}

headers = {
    "Authorization": f"Bearer {DATABRICKS_TOKEN}",
    "Content-Type": "application/json"
}

response = requests.post(
    endpoint_url,
    headers=headers,
    data=json.dumps(payload)
)

print(response.json())
```

### Step 3: Load the raw text and serialize to JSON array

Code block one reads a line-delimited text file from Volumes, collects all the lines into a single JSON array string and displays that JSON array string for sanity checking. LLM endpoints expect a single string.

Pitfalls: Very long payloads (i.e. a year of reporting) could exceed the endpoint request size, non UTF-8 characters in text can cause serialization issues, noise such as headers, footers and URLs may dilute the models attention.

```python
import os, time
import markdown as md
from pyspark.sql import functions as F
import re, json, html, requests, ast, hashlib
import pandas as pd

df = spark.read.text(
    "/Volumes/workspace/osint_intell/unstructured_data/napoli_amd_report_202412.txt"
)

clean_df = df.select(
    F.regexp_replace(
        F.col("value"),
        r"\s+",
        " "
    ).alias("value")  # collapse whitespace
).filter(F.length("value") > 0)

json_array_str = (
    clean_df
    .agg(F.to_json(F.collect_list("value")).alias("json"))
    .first()["json"]
)
```

### Step 4: Build the prompt and call the Databricks model endpoint

The next code blocks assemble a task prompt tailored to strategic intelligence and the planned questions to answer. It calls the chosen Databricks foundation model endpoint via REST, and then extracts the model output with a function created called `extract_markdown`.

```python
# Helper functions
def extract_markdown(resp_json):
    choice = resp_json.get("choices", [{}])[0]
    msg = choice.get("message", {})
    content = msg.get("content", "")

    if isinstance(content, str):
        return content.strip()

    if isinstance(content, list):
        parts = []
        for block in content:
            if block.get("type") in ("text", "output_text"):
                parts.append(block.get("text", ""))
        return "\n\n".join(p for p in parts if p).strip()

    return str(content)


def strip_fences(text: str) -> str:
    # Remove a single surrounding ``` ``` fence if present
    m = re.match(
        r"^\s*```(?:\w+)?\s*(.*?)\s*```\s*$",
        text,
        flags=re.S
    )
    return m.group(1) if m else text


DATABRICKS_TOKEN = os.environ.get(
    "DATABRICKS_TOKEN",
    "REPLACE WITH YOUR TOKEN"
)

MAX_CHARS = 120_000
json_str_safe = json_array_str[:MAX_CHARS]
audit_hash = hashlib.sha256(
    json_str_safe.encode("utf-8")
).hexdigest()

prompt = (
    "Role: Criminal intelligence analyst (law enforcement). "
    "Task: Produce a strategic assessment from the provided open-source text. "
    "Deliverables:\n"
    "1) Key Actors & Alliances (groups/clans, relationships, activities)\n"
    "2) Territorial Dynamics (areas of influence, disputes, shifts)\n"
    "3) Tactics & Modus Operandi (methods, patterns, innovation)\n"
    "4) Overall Assessment (risks, opportunities for disruption)\n\n"
    f"Source Hash: {audit_hash}\n"
    f"Text (JSON lines array):\n{json_str_safe}"
)

payload = {
    "messages": [
        {
            "role": "user",
            "content": prompt
        }
    ]
}

headers = {
    "Authorization": f"Bearer {DATABRICKS_TOKEN}",
    "Content-Type": "application/json"
}

endpoint_url = (
    "https://dbc-280d238a-a230.cloud.databricks.com/"
    "serving-endpoints/databricks-gpt-oss-120b/invocations"
)

# retry on transient errors
for attempt in range(3):
    try:
        response = requests.post(
            endpoint_url,
            headers=headers,
            data=json.dumps(payload),
            timeout=60
        )
        response.raise_for_status()
        break

    except requests.exceptions.RequestException as e:
        if attempt == 2:
            raise
        time.sleep(2 * (attempt + 1))

resp_json = response.json()
markdown_content = extract_markdown(resp_json)

displayHTML(
    "<div style='white-space:pre-wrap; "
    "font-family:system-ui, -apple-system, Segoe UI, Roboto, Arial; "
    "line-height:1.4'>"
    f"{html.escape(markdown_content)}</div>"
)
```

### Step 5: Render as rich HTML (Markdown → HTML with table styling)

The final part strips code fences from any triple-backtick block the model returns and tries to render Markdown with basic extensions.

```python
markdown_content = strip_fences(
    extract_markdown(resp_json)
)

try:
    import markdown as md

    html_body = md.markdown(
        markdown_content,
        extensions=[
            "tables",
            "fenced_code",
            "sane_lists"
        ]
    )

except Exception:
    displayHTML(
        "<div style='white-space:pre-wrap; "
        "font-family:system-ui; line-height:1.5'>"
        f"{html.escape(markdown_content)}</div>"
    )

else:
    styled_html = f"""
    <style>
      .intel-wrap {{
        font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        line-height: 1.5;
        font-size: 14px;
      }}

      .intel-wrap table {{
        border-collapse: collapse;
        margin: 0.8em 0;
        width: 100%;
      }}

      .intel-wrap th,
      .intel-wrap td {{
        border: 1px solid #444;
        padding: 6px 10px;
        vertical-align: top;
      }}

      .intel-wrap th {{
        background: #f4f4f4;
        font-weight: 600;
      }}

      .intel-wrap tbody tr:nth-child(odd) td {{
        background: #fafafa;
      }}
    </style>

    <div class="intel-wrap">{html_body}</div>
    """

    displayHTML(styled_html)
```

This provides a clean, printable briefing directly in the notebook with improved table readability.

A result of this approach can be found [here on GitHub](https://github.com/routineactivity/adhoc_notebooks/blob/main/osint_intell_report/osint_automated_threat_assessment.md). Screenshots for this output are also shown below.

<!-- IMAGE PLACEHOLDER 2
Original caption: Sample output table: key actors and alliances
-->
![Sample output table: key actors and alliances – replace with uploaded image](images/osint-key-actors-alliances.png)

*Sample output table: key actors and alliances*

<!-- IMAGE PLACEHOLDER 3
Original caption: Sample output table: territorial dynamics
-->
![Sample output table: territorial dynamics – replace with uploaded image](images/osint-territorial-dynamics.png)

*Sample output table: territorial dynamics*

<!-- IMAGE PLACEHOLDER 4
Original caption: Sample output table: Tactics and MOs
-->
![Sample output table: tactics and MOs – replace with uploaded image](images/osint-tactics-mos.png)

*Sample output table: Tactics and MOs*

<!-- IMAGE PLACEHOLDER 5
Original caption: Sample output table: summary of recommendations and bottom line narrative
-->
![Sample output table: summary recommendations and bottom line narrative – replace with uploaded image](images/osint-summary-recommendations.png)

*Sample output table: summary of recommendations and bottom line narrative*

This workflow shows what’s technically possible, not what’s operationally proven. We don’t yet know how accurate, reliable, or decision-useful LLM summaries are for intelligence work. Treat outputs as experimental drafts that may omit nuance, misread context, or overstate patterns — especially with noisy OSINT where provenance and intent are uncertain.

LLMs can speed up processing, but analysis and assessment remain human responsibilities. Until we have robust evaluation in real workflows, treat this as an aid to triage and sense-making — not a substitute for professional intelligence tradecraft.

NB: ChatGPT was used to elaborate my original outline and notes in bringing this article together, notably the section on Limitations and Considerations. If you are interested in intelligence analysis work and OSINT in particular, I would highly recommend the following resources:

- [NixIntel](https://nixintel.info/)
- [Secjuice](https://www.secjuice.com/)

I originally posted this on <a href="https://medium.com/@routineactivity85/osint-from-raw-text-to-threat-assessment-with-databricks-e8690ac39508" target="_blank">Medium</a>
