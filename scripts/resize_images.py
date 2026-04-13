from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "original"
WEB = ROOT / "assets" / "web"
CLAUDE = ROOT / "assets" / "claude"

WEB_MAX = 1920
WEB_QUALITY = 82
CLAUDE_MAX = 1024
CLAUDE_QUALITY = 75

WEB.mkdir(parents=True, exist_ok=True)
CLAUDE.mkdir(parents=True, exist_ok=True)


def resize(img: Image.Image, max_side: int) -> Image.Image:
    w, h = img.size
    scale = min(1.0, max_side / max(w, h))
    if scale >= 1.0:
        return img.copy()
    return img.resize((round(w * scale), round(h * scale)), Image.LANCZOS)


def process(path: Path) -> None:
    with Image.open(path) as im:
        im = im.convert("RGB")
        web_img = resize(im, WEB_MAX)
        web_img.save(WEB / path.name, "JPEG", quality=WEB_QUALITY, optimize=True, progressive=True)
        claude_img = resize(im, CLAUDE_MAX)
        claude_img.save(CLAUDE / path.name, "JPEG", quality=CLAUDE_QUALITY, optimize=True)


def main() -> None:
    files = sorted(p for p in SRC.iterdir() if p.suffix.lower() in {".jpg", ".jpeg"})
    for i, p in enumerate(files, 1):
        process(p)
        print(f"[{i}/{len(files)}] {p.name}")


if __name__ == "__main__":
    main()
