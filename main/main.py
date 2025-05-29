import os
import string
import random


def generate_random_string(length=12):
    chars = string.ascii_letters + string.digits
    return "".join(random.choice(chars) for _ in range(length))


def rename_selected_files(folder_path, selected_files, output_file="file_map.txt"):
    mapping = []

    for filename in selected_files:
        old_path = os.path.join(folder_path, filename)
        if not os.path.isfile(old_path):
            print(f" File does not exist: {filename}")
            continue

        extension = os.path.splitext(filename)[1]
        new_name = generate_random_string(12) + extension
        new_path = os.path.join(folder_path, new_name)

        while os.path.exists(new_path):
            new_name = generate_random_string(12) + extension
            new_path = os.path.join(folder_path, new_name)

        os.rename(old_path, new_path)
        mapping.append((new_name, filename))
        print(f" {filename} -> {new_name}")

    with open(os.path.join(folder_path, output_file), mode="w", encoding="utf-8") as f:
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
    else:
        rename_selected_files(folder, selected_files)
