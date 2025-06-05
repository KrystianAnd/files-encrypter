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
    <div className="w-full flex justify-center ">
      <div className="w-full max-w-[1200px] text-center" >
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
            {error}
          </div>
        )}

        <div
          className="mb-4 grid grid-cols-4 "
        >
          {files.map((file, idx) => (
            <div
              key={idx}
              className=" h-[50px] flex items-center  text-center text-large bg-white border border-gray-300 rounded-full pt-4 py-3 shadow-sm w-full max-w-[200px]"
            >
              <input
                type="checkbox"
                checked={selected.includes(file)}
                onChange={() => toggleSelection(file)}
                className="mr-3 w-4 h-4 accent-gray-600"
              />
              <span className="text-gray-800 text-sm truncate">{file}</span>
            </div>
          ))}
        </div>
  
        {files.length > 0 && (
          <button
            onClick={handleModalOpen}
            disabled={selected.length === 0}
            className="w-[25%] bg-[#FF7A4C] h-[50px] mt-[35px] text-white py-3 rounded-full text-center font-semibold transition-all duration-200 hover:bg-[#ff6933] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Changes
          </button>
        )}


  
        <PreviewModal
          visible={showModal}
          files={selected}
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
        />
      </div>
    </div>
  );
  
  
}
