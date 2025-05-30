import secrets
import string
from datetime import UTC, datetime
from pathlib import Path


def generate_random_string(length: int = 12) -> str:
    chars = string.ascii_letters + string.digits
    return "".join(secrets.choice(chars) for _ in range(length))


def rename_files(folder_path: Path, selected_files: list[str]) -> list[dict]:
    mapping = []
    used_names = {f.name for f in folder_path.iterdir() if f.is_file()}

    for filename in selected_files:
        old_path = folder_path / filename
        if not old_path.is_file():
            continue

        extension = old_path.suffix
        new_name = generate_random_string(12) + extension
        new_path = folder_path / new_name

        while new_path.exists() or new_name in used_names:
            new_name = generate_random_string(12) + extension
            new_path = folder_path / new_name

        old_path.rename(new_path)
        used_names.add(new_name)
        mapping.append({"old": filename, "new": new_name})

    now = datetime.now(UTC).astimezone().strftime("%Y-%m-%d %H:%M:%S %Z")
    log_path = Path.home() / "Desktop" / "codes" / "file_map.txt"
    log_path.parent.mkdir(exist_ok=True)

    with log_path.open("a", encoding="utf-8") as f:
        f.write(f"\n[Date: {now} | Folder: {folder_path}]\n")
        for m in mapping:
            f.write(f"{m['new']} -> {m['old']}\n")

    return mapping
