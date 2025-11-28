import os
import re

def natural_sort_key(s):
    return [int(text) if text.isdigit() else text.lower()
            for text in re.split('([0-9]+)', s)]

def rename_files_in_folder(folder_path):
    # Get all files
    try:
        files = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f)) and not f.startswith('.')]
    except FileNotFoundError:
        print(f"Folder not found: {folder_path}")
        return

    # Filter for media files
    media_extensions = {'.jpg', '.jpeg', '.png', '.mp4', '.mov'}
    media_files = [f for f in files if os.path.splitext(f)[1].lower() in media_extensions]

    # Sort files naturally to preserve existing order as much as possible
    media_files.sort(key=natural_sort_key)

    # Determine base name from the folder name
    folder_name = os.path.basename(folder_path)
    # Handle "The One with the ..." naming convention
    if folder_name.startswith("The One with the "):
        base_name = folder_name.replace("The One with the ", "")
    else:
        # Fallback for other folders like 'sachin', 'sid', etc.
        base_name = folder_name

    print(f"Renaming {len(media_files)} files in '{folder_name}' with base '{base_name}'...")

    # Temporary rename to avoid collisions
    temp_files = []
    for i, filename in enumerate(media_files):
        ext = os.path.splitext(filename)[1]
        old_path = os.path.join(folder_path, filename)
        temp_name = f"__TEMP_{i}{ext}"
        temp_path = os.path.join(folder_path, temp_name)
        os.rename(old_path, temp_path)
        temp_files.append(temp_path)

    # Final rename
    for i, temp_path in enumerate(temp_files):
        ext = os.path.splitext(temp_path)[1]
        new_name = f"{base_name}{i+1}{ext}"
        new_path = os.path.join(folder_path, new_name)
        os.rename(temp_path, new_path)
        print(f"  Renamed to: {new_name}")

def main():
    base_dir = "/Users/sumit/Desktop/Deck/Friends_Nostalgia_Webpage/images"
    
    # List of folders to process
    folders = [
        "The One with the VajraPoha",
        "The One with the Yallur Fort",
        "The One with the Home",
        "The One with the Odessey",
        "The One with the Mandoli",
        "The One with the Graduation",
        "sachin", "sid", "darshan", "shirish", "anil", "prajwal", "abhishek"
    ]

    for folder in folders:
        folder_path = os.path.join(base_dir, folder)
        rename_files_in_folder(folder_path)

if __name__ == "__main__":
    main()
