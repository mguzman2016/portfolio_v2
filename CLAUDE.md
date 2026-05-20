# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Python data pipeline that fetches job listings from LinkedIn's internal Voyager API. Sources (search queries, locations, auth) are declared in YAML config; the pipeline reads them and fetches results.

## Structure

```
pipeline/
  main.py                  # Pipeline entrypoint
  config/
    sources.yaml           # Declares LinkedIn search sources (endpoint, params, auth, metadata)
infra/                     # Infrastructure-as-code (to be populated)
```

## Source Configuration (`pipeline/config/sources.yaml`)

Each source defines:
- `endpoint` — LinkedIn Voyager API URL
- `params` — query parameters (keywords, geoId, pagination via `start`/`count`)
- `auth.type: cookie` + `auth.secret_name` — the secret key name for the LinkedIn session cookie
- `meta` — human-readable labels (keywords, location, geo_id)

Auth secrets are not stored in the repo; they are resolved at runtime by the pipeline using `secret_name`.

## Python Tooling

The `.gitignore` includes patterns for **ruff** (linting/formatting), **pytest** (testing), **mypy** (type checking), and common environment managers (venv, pdm, pixi, poetry). Use whichever is present in the environment.
