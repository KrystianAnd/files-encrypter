"use client";
import { useEffect, useState, useContext } from "react";
import { RenameContext } from "../contexts/RenameContext";
import PreviewModal from "./PreviewModal";

export default function FileSelector() {
  const { folderPath, setResults } = useContext(RenameContext);
  const [files, setFiles] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!folderPath) return;

    const fetchFiles = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/listfiles/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: folderPath }),
        });
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Error while fetching files");
          return;
        }

        setFiles(data.files);
        setError("");
      } catch (e) {
        setError("Failed to connect to the API");
      }
    };

    fetchFiles();
  }, [folderPath]);

  const toggleSelection = (file: string) => {
    setSelected((prev) =>
      prev.includes(file) ? prev.filter((f) => f !== file) : [...prev, file]
    );
  };

  const handleRename = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/rename/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          folder_path: folderPath,
          selected_files: selected,
        }),
      });
      const data = await res.json();
      setResults(data);
      setSelected([]);
    } catch (e) {
      setResults({ error: "Failed to send data to the API" });
    }
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    handleRename();
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full h-auto max-w-3xl bg-white border p-4 rounded space-y-2">
      <h2 className="text-lg font-semibold">Select files to rename:</h2>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="max-h-[300px] overflow-y-auto border p-2 rounded">
        {files.map((file, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.includes(file)}
              onChange={() => toggleSelection(file)}
            />
            <span>{file}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleModalOpen}
        disabled={selected.length === 0}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
      >
        Rename selected files
      </button>

      <PreviewModal
        visible={showModal}
        files={selected}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
    </div>
  );
}
