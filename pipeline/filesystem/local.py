import json
from pathlib import Path


def get_tmp_path(city: str, search: str) -> Path:
    return Path(f"/tmp/linkedin_{city}_{search}.jsonl")


def append_record(path: Path, record: dict) -> None:
    with open(path, "a", encoding="utf-8") as f:
        f.write(json.dumps(record, ensure_ascii=False) + "\n")


def cleanup(path: Path) -> None:
    if path.exists():
        path.unlink()
