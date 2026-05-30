from dataclasses import dataclass
from pathlib import Path
import yaml


@dataclass
class SearchConfig:
    city: str
    search: str
    url: str


@dataclass
class PipelineConfig:
    searches: list[SearchConfig]


def load_config(config_path: str) -> PipelineConfig:
    with open(Path(config_path)) as f:
        raw = yaml.safe_load(f)

    searches = [
        SearchConfig(
            city=entry["city"],
            search=entry["search"],
            url=entry["url"],
        )
        for entry in raw["searches"]
    ]

    return PipelineConfig(searches=searches)
