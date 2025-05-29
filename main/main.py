import os
import string
import random
from datetime import datetime


def generate_random_string(length=12):
    chars = string.ascii_letters + string.digits
    return "".join(random.choice(chars) for _ in range(length))


def create_codes_folder_on_desktop():
    desktop_path = os.path.join(os.path.expanduser("~"), "Desktop")
    codes_folder = os.path.join(desktop_path, "codes")
    os.makedirs(codes_folder, exist_ok=True)
    file_map_path = os.path.join(codes_folder, "file_map.txt")

    if not os.path.isfile(file_map_path):
        with open(file_map_path, "w", encoding="utf-8") as f:
            f.write("")

    return file_map_path


def rename_selected_files(folder_path, selected_files, output_file=None):
    if output_file is None:
        output_file = create_codes_folder_on_desktop()

    mapping = []
    used_names = set(os.listdir(folder_path))

    for filename in selected_files:
        old_path = os.path.join(folder_path, filename)
        if not os.path.isfile(old_path):
            print(f" File does not exist: {filename}")
            continue

        extension = os.path.splitext(filename)[1]
        new_name = generate_random_string(12) + extension
        new_path = os.path.join(folder_path, new_name)

        while os.path.exists(new_path) or new_name in used_names:
            new_name = generate_random_string(12) + extension
            new_path = os.path.join(folder_path, new_name)

        os.rename(old_path, new_path)
        used_names.add(new_name)
        mapping.append((new_name, filename))
        print(f" {filename} -> {new_name}")

    with open(output_file, mode="a", encoding="utf-8") as f:
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        f.write(f"\n[Date: {now} | Folder: {folder_path}]\n")
        for new_name, old_name in mapping:
            f.write(f"{new_name} -> {old_name}\n")
    print(f"\n File map saved to: {output_file}")


if __name__ == "__main__":
    folder = input(" Enter the path to the folder: ")

    if not os.path.isdir(folder):
        print(" That is not a valid folder.")
        exit()

    files = [f for f in os.listdir(folder) if os.path.isfile(os.path.join(folder, f))]

    if not files:
        print(" The folder is empty.")
        exit()

    print("\n Files in the folder:")
    for i, f in enumerate(files):
        print(f"{i + 1}. {f}")

    selected = input("\n Enter the file numbers to rename (e.g. 1,3,5): ")
    selected_indexes = [
        int(i.strip()) - 1 for i in selected.split(",") if i.strip().isdigit()
    ]
    selected_files = [files[i] for i in selected_indexes if 0 <= i < len(files)]

    if not selected_files:
        print(" No files selected.")
        exit()

    print("\n Selected files to rename:")
    for f in selected_files:
        print(f" - {f}")

    confirm = (
        input("\n Are you sure you want to rename these files? (y/n): ").strip().lower()
    )
    if confirm != "y":
        excluded = input(
            " Enter numbers of files you DO NOT want to rename (e.g. 2,3): "
        )
        exclude_indexes = [
            int(i.strip()) - 1 for i in excluded.split(",") if i.strip().isdigit()
        ]
        exclude_files = [files[i] for i in exclude_indexes if 0 <= i < len(files)]
        selected_files = [f for f in selected_files if f not in exclude_files]

        if not selected_files:
            print(" No files left to rename after exclusion. Exiting.")
            exit()

        print("\n Updated list of files to rename:")
        for f in selected_files:
            print(f" - {f}")

        confirm = (
            input("\n Final confirmation. Rename these files? (y/n): ").strip().lower()
        )
        if confirm != "y":
            print(" Operation canceled. No files were renamed.")
            exit()

    confirm_final = (
        input("\n Are you REALLY sure you want to rename these files? (y/n): ")
        .strip()
        .lower()
    )
    if confirm_final != "y":
        print(" Operation aborted. No changes were made.")
    else:
        rename_selected_files(folder, selected_files)
