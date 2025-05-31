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
    <div className="w-full max-w-3xl bg-gradient-to-br from-violet-50 to-fuchsia-50 shadow-xl rounded-2xl p-8 border border-violet-100">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-semibold text-violet-900">File Selection</h2>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
          {error}
        </div>
      )}

      <div className="bg-white/70 backdrop-blur-sm border border-violet-100 rounded-xl p-4 mb-6">
        <ul className="max-h-[300px] overflow-y-auto space-y-2">
          {files.map((file, idx) => (
            <li key={idx} className="flex items-center gap-3 p-2 hover:bg-violet-50 rounded-lg transition-all">
              <input
                type="checkbox"
                checked={selected.includes(file)}
                onChange={() => toggleSelection(file)}
                className="w-4 h-4 text-violet-500 rounded focus:ring-violet-400"
              />
              <span className="text-violet-900">{file}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleModalOpen}
        disabled={selected.length === 0}
        className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-3 px-6 rounded-lg font-medium hover:from-violet-700 hover:to-fuchsia-700 focus:ring-4 focus:ring-violet-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        Rename {selected.length} {selected.length === 1 ? 'file' : 'files'}
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