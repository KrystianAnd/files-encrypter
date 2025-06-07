# 🔐 File-Encrypter

**File-Encrypter** is a simple utility that allows users to anonymize file names within a selected folder. It replaces original file names with randomly generated 12-character strings and stores a mapping of these changes for later reference.

<img width="1505" alt="Zrzut ekranu 2025-06-7 o 18 15 01" src="https://github.com/user-attachments/assets/59d483ea-6ca9-450d-9f09-d92039387df2" />


---

## 🚀 Features

- Rename selected files to random 12-character names.
- User provides a folder path and selects specific files to anonymize.
- A mapping file (`file_map.txt`) is generated and saved in a `codes` folder.
- Console and web-based interface available.
- Safe, fast, and easy to use.

---

## 🛠️ Tech Stack

### Backend
- **Django** 4.2.11  
- **Django REST Framework** 3.15.2
- **django-cors-headers** 4.7.0
- **Pytest** 8.1.1
- **Ruff**

### Frontend
- **Next.js** 15.3.3

### CLI Version
- Available in the `main` directory as a command-line utility.

---

## 🗂️ Project Structure


---

## ▶️ How to Run

1. **Clone the repository:**
   ```bash
   git clone https://KrystianAnd/files-encrypter.git
   cd files-encrypter
   ```
2. **Install requirements for backend:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
3. **Install Frontend:**
   ```bash
   cd .. 
   cd frontend
   cd app_frontend
   npm install 
   ```
4. **Run web aplication (Linux/MacOS) :**
   ```bash
   cd ../..
   chmod +x run.sh
   ./run.sh
   ```
   ---
## Important !!!

   You must check witch python version you use
   ```bash
   python3 manage.py runserver &
   ```
   *If you use python just remove 3 in `run.sh`*

   ---
   To check witch version you use just simply:
   ```bash
   witch python
   ```

---
## 📄 Output

After processing, a (`file_map.txt`) will be created inside the codes/ folder. This file contains the mapping of original file names and change data time to their encrypted versions.


---
## 📬 Contributions

Feel free to open issues or submit pull requests to improve the project.
