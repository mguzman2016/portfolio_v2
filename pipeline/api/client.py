import json
import time
import boto3
import requests


def get_secret(secret_name: str) -> dict:
    client = boto3.client("secretsmanager")
    response = client.get_secret_value(SecretId=secret_name)
    return json.loads(response["SecretString"])


def build_headers(secret: dict) -> dict:
    return {
        "accept": "application/vnd.linkedin.normalized+json+2.1",
        "accept-language": "en-US,en;q=0.6",
        "cookie": secret["cookie"],
        "csrf-token": secret["csrf_token"],
        "referer": "https://www.linkedin.com/",
        "origin": "https://www.linkedin.com",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36",
        "x-li-lang": "en_US",
        "x-restli-protocol-version": "2.0.0",
    }


def get(url: str, headers: dict, delay: float = 1.0) -> dict:
    time.sleep(delay)
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()
