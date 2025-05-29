import secrets
import string
import sys
from datetime import UTC, datetime
from pathlib import Path


def generate_random_string(length: int = 12) -> str:
    chars = string.ascii_letters + string.digits
    return "".join(secrets.choice(chars) for _ in range(length))


def create_codes_folder_on_desktop() -> Path:
    desktop_path = Path.home() / "Desktop"
    codes_folder = desktop_path / "codes"
    codes_folder.mkdir(exist_ok=True)
    file_map_path = codes_folder / "file_map.txt"

    if not file_map_path.is_file():
        file_map_path.write_text("", encoding="utf-8")

    return file_map_path


def rename_selected_files(folder_path: Path, selected_files: list[str], output_file: Path | None = None) -> None:
    if output_file is None:
        output_file = create_codes_folder_on_desktop()

    mapping = []
    used_names = {file.name for file in folder_path.iterdir() if file.is_file()}

    for filename in selected_files:
        old_path = folder_path / filename
        if not old_path.is_file():
            print(f" File does not exist: {filename}")
            continue

        extension = old_path.suffix
        new_name = generate_random_string(12) + extension
        new_path = folder_path / new_name

        while new_path.exists() or new_name in used_names:
            new_name = generate_random_string(12) + extension
            new_path = folder_path / new_name

        old_path.rename(new_path)
        used_names.add(new_name)
        mapping.append((new_name, filename))
        print(f" {filename} -> {new_name}")

    now = datetime.now(UTC).astimezone().strftime("%Y-%m-%d %H:%M:%S %Z")
    with output_file.open(mode="a", encoding="utf-8") as f:
        f.write(f"\n[Date: {now} | Folder: {folder_path}]\n")
        for new_name, old_name in mapping:
            f.write(f"{new_name} -> {old_name}\n")

    print(f"\n File map saved to: {output_file}")


if __name__ == "__main__":
    folder_input = input(" Enter the path to the folder: ")
    folder = Path(folder_input).expanduser()

    if not folder.is_dir():
        print(" That is not a valid folder.")
        sys.exit()

    files = [f.name for f in folder.iterdir() if f.is_file()]
    subfolders = [f.name for f in folder.iterdir() if f.is_dir()]

    if not files:
        print(" The folder has no files.")
    else:
        print("\n Files in the folder:")
        for i, f in enumerate(files):
            print(f"{i + 1}. {f}")

    if subfolders:
        print("\n Subfolders (not included automatically):")
        for sf in subfolders:
            print(f"- {sf}/ [folder]")

        print(
            "\n If you want to rename files inside a subfolder, "
            "please rerun the script with the full path to that subfolder."
        )

    if not files:
        sys.exit()

    selected = input("\n Enter the file numbers to rename (e.g. 1,3,5): ")
    selected_indexes = [int(i.strip()) - 1 for i in selected.split(",") if i.strip().isdigit()]
    selected_files = [files[i] for i in selected_indexes if 0 <= i < len(files)]

    if not selected_files:
        print(" No files selected.")
        sys.exit()

    print("\n Selected files to rename:")
    for f in selected_files:
        print(f" - {f}")

    confirm = input("\n Are you sure you want to rename these files? (y/n): ").strip().lower()
    if confirm != "y":
        excluded = input(" Enter numbers of files you DO NOT want to rename (e.g. 2,3): ")
        exclude_indexes = [int(i.strip()) - 1 for i in excluded.split(",") if i.strip().isdigit()]
        exclude_files = [files[i] for i in exclude_indexes if 0 <= i < len(files)]
        selected_files = [f for f in selected_files if f not in exclude_files]

        if not selected_files:
            print(" No files left to rename after exclusion. Exiting.")
            sys.exit()

        print("\n Updated list of files to rename:")
        for f in selected_files:
            print(f" - {f}")

        confirm = input("\n Final confirmation. Rename these files? (y/n): ").strip().lower()
        if confirm != "y":
            print(" Operation canceled. No files were renamed.")
            sys.exit()

    confirm_final = input("\n Are you REALLY sure you want to rename these files? (y/n): ").strip().lower()
    if confirm_final != "y":
        print(" Operation aborted. No changes were made.")
    else:
        rename_selected_files(folder, selected_files)
