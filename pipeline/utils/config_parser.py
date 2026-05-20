from pathlib import Path
import yaml
from dataclasses import dataclass


@dataclass
class SourceAuth:
    type: str
    secret_name: str


@dataclass
class SourceMeta:
    keywords: str
    location: str
    geo_id: int


@dataclass
class Source:
    name: str
    enabled: bool
    endpoint: str
    params: dict
    auth: SourceAuth
    meta: SourceMeta


def load_sources(config_path: Path | str) -> list[Source]:
    with open(config_path) as f:
        raw = yaml.safe_load(f)

    sources = []
    for item in raw["sources"]:
        sources.append(
            Source(
                name=item["name"],
                enabled=item["enabled"],
                endpoint=item["endpoint"],
                params=item["params"],
                auth=SourceAuth(**item["auth"]),
                meta=SourceMeta(**item["meta"]),
            )
        )
    return sources
