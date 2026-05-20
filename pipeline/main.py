from pathlib import Path
from utils.config_parser import load_sources

CONFIG_PATH = Path(__file__).parent / "config" / "sources.yaml"


def main() -> None:
    sources = load_sources(CONFIG_PATH)
    for source in sources:
        print(f"[{source.name}]")
        print(f"  enabled:     {source.enabled}")
        print(f"  endpoint:    {source.endpoint}")
        print(f"  params:      {source.params}")
        print(f"  auth:        type={source.auth.type}, secret={source.auth.secret_name}")
        print(f"  meta:        keywords={source.meta.keywords}, location={source.meta.location}, geo_id={source.meta.geo_id}")
        print()


if __name__ == "__main__":
    main()
