from pathlib import Path
from rembg import remove, new_session
from PIL import Image
import io

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "bowls"
OUT = ROOT / "assets" / "bowls_cut"
OUT.mkdir(parents=True, exist_ok=True)

session = new_session("isnet-general-use")


def process(path: Path) -> None:
    raw = path.read_bytes()
    cut = remove(raw, session=session, alpha_matting=True, alpha_matting_foreground_threshold=240)
    im = Image.open(io.BytesIO(cut)).convert("RGBA")
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    out_path = OUT / (path.stem + ".png")
    im.save(out_path, "PNG", optimize=True)
    print(f"{path.name} -> {out_path.name} {im.size}")


def main() -> None:
    files = sorted(p for p in SRC.iterdir() if p.suffix.lower() in {".jpg", ".jpeg", ".png"})
    for p in files:
        process(p)


if __name__ == "__main__":
    main()
