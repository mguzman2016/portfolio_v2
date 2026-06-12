# portfolio_v2

## LinkedIn Pipeline

Fetches job listings from LinkedIn and stores them as JSONL files in S3, partitioned by city, search term, and date.

**Prerequisites:** AWS credentials configured via `aws configure`.

```bash
cd pipeline

make build   # build the Docker image
make run     # run the pipeline
```

## Warehouse

A dbt + DuckDB star schema warehouse (Kimball) built on top of the raw LinkedIn JSONL data in S3.

**Architecture:**
- **Staging** — views over S3, casts types and extracts Hive partition values
- **Intermediate** — views that deduplicate jobs and snapshot companies by day
- **Marts** — materialised dimensions (`dim_job`, `dim_company`, `dim_date`, …) and incremental facts (`fct_job_postings`, `fct_company_snapshots`)

**Incremental strategy:** the compiled DuckDB file is persisted at `s3://mguzman-portfolio/linkedin_warehouse/warehouse.duckdb`. On each run `sync.py` downloads it (if it exists), runs `dbt build` (models + tests), and re-uploads the result. First run performs a full load; subsequent runs only process new S3 partitions.

**Prerequisites:** AWS credentials configured via `aws configure`.

```bash
cd warehouse

make download-db      # pull the latest warehouse.duckdb from S3 for local dev
make run              # dbt build (models + tests) against the local database
make docker-build     # build the Docker image
make docker-run       # run the full sync: S3 download → dbt build → S3 upload
```