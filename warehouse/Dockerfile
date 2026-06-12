FROM python:3.12-slim

WORKDIR /warehouse

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
RUN dbt deps

ENV DBT_PROFILES_DIR=/warehouse

CMD ["python", "sync.py"]
