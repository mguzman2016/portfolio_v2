# portfolio_v2

## LinkedIn Pipeline

Fetches job listings from LinkedIn and stores them as JSONL files in S3.

**Prerequisites:** AWS credentials configured via `aws configure`.

```bash
cd pipeline

make build   # build the Docker image
make run     # run the pipeline
```