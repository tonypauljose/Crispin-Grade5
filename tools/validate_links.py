"""Validate that every internal href/src in the portal resolves to an actual file.

Usage:
    python tools/validate_links.py

Exits 0 if all OK, 1 if any broken links are found.
"""
from __future__ import annotations

import io
import sys
from pathlib import Path
from urllib.parse import urlparse, unquote

# Force UTF-8 stdout on Windows so rich's unicode characters don't break cp1252.
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

try:
    from bs4 import BeautifulSoup
except ImportError:
    print("bs4 not installed. Run: pip install -r tools/requirements.txt", file=sys.stderr)
    sys.exit(2)

try:
    from rich.console import Console
    console = Console()
except ImportError:
    class _C:
        def print(self, *a, **k):
            print(*a)
    console = _C()


ROOT = Path(__file__).resolve().parent.parent
HTML_FILES = list(ROOT.rglob("*.html"))


def is_external(href: str) -> bool:
    if not href:
        return True
    p = urlparse(href)
    return bool(p.scheme) or href.startswith("mailto:") or href.startswith("tel:") or href.startswith("#")


def resolve(src_file: Path, href: str) -> Path:
    # Strip fragment, query
    clean = unquote(href.split("#")[0].split("?")[0])
    if not clean:
        return src_file
    if clean.startswith("/"):
        return ROOT / clean.lstrip("/")
    return (src_file.parent / clean).resolve()


def main() -> int:
    broken: list[tuple[Path, str, str]] = []
    checked = 0

    for html_file in HTML_FILES:
        if ".tmp" in html_file.parts:
            continue
        try:
            content = html_file.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            console.print(f"[yellow]Could not read {html_file} (encoding issue)[/yellow]")
            continue
        soup = BeautifulSoup(content, "html.parser")

        for tag, attr in [("a", "href"), ("script", "src"), ("link", "href"), ("img", "src")]:
            for el in soup.find_all(tag):
                val = el.get(attr)
                if not val or is_external(val):
                    continue
                if val.startswith("data:"):
                    continue
                checked += 1
                target = resolve(html_file, val)
                if not target.exists():
                    broken.append((html_file, val, str(target)))

    if broken:
        console.print(f"[red]✗ {len(broken)} broken link(s) in {checked} checks:[/red]")
        for src, href, target in broken:
            rel = src.relative_to(ROOT)
            console.print(f"  [red]•[/red] {rel}: [bold]{href}[/bold] → {target}")
        return 1

    console.print(f"[green]✓ All {checked} internal links resolve correctly across {len(HTML_FILES)} HTML files.[/green]")
    return 0


if __name__ == "__main__":
    sys.exit(main())
