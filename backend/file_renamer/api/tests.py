import re
import string
from pathlib import Path
from unittest.mock import patch

import pytest

from api.utils import generate_random_string, rename_files

STRING_LENGTH_SHORT = 12
STRING_LENGTH_MEDIUM = 16
STRING_LENGTH_LONG = 32


def test_generate_random_string_length() -> None:
    s = generate_random_string(STRING_LENGTH_MEDIUM)
    assert len(s) == STRING_LENGTH_MEDIUM


def test_generate_random_string_charset() -> None:
    s = generate_random_string(STRING_LENGTH_LONG)
    allowed_chars = string.ascii_letters + string.digits
    assert all(c in allowed_chars for c in s)


def test_generate_random_string_randomness() -> None:
    s1 = generate_random_string(STRING_LENGTH_SHORT)
    s2 = generate_random_string(STRING_LENGTH_SHORT)
    assert s1 != s2


def test_rename_files_basic(tmp_path: Path) -> None:
    file_names = ["file1.txt", "file2.txt", "file3.txt"]
    for name in file_names:
        (tmp_path / name).write_text("test content")

    with patch("api.utils.generate_random_string", side_effect=["AAA111", "BBB222", "CCC333"]):
        mapping = rename_files(tmp_path, file_names)

    expected_mapping = [
        {"old": "file1.txt", "new": "AAA111.txt"},
        {"old": "file2.txt", "new": "BBB222.txt"},
        {"old": "file3.txt", "new": "CCC333.txt"},
    ]
    assert mapping == expected_mapping

    for m in expected_mapping:
        assert not (tmp_path / m["old"]).exists()
        assert (tmp_path / m["new"]).exists()


def test_rename_files_ignores_missing(tmp_path: Path) -> None:
    (tmp_path / "file1.txt").write_text("hello")

    selected_files = ["file1.txt", "missing.txt"]

    with patch("api.utils.generate_random_string", return_value="XXX999"):
        mapping = rename_files(tmp_path, selected_files)

    assert mapping == [{"old": "file1.txt", "new": "XXX999.txt"}]
    assert (tmp_path / "XXX999.txt").exists()
    assert not (tmp_path / "file1.txt").exists()


def test_rename_files_creates_log(tmp_path: Path, tmp_path_factory: pytest.TempPathFactory) -> None:
    (tmp_path / "test.txt").write_text("abc")

    fake_home = tmp_path_factory.mktemp("fake_home")
    with patch("pathlib.Path.home", return_value=fake_home):
        with patch("api.utils.generate_random_string", return_value="ZZZ000"):
            rename_files(tmp_path, ["test.txt"])

        log_file = fake_home / "Desktop" / "codes" / "file_map.txt"
        assert log_file.exists()

        log_content = log_file.read_text(encoding="utf-8")
        assert re.search(r"ZZZ000\.txt <- test\.txt", log_content)
