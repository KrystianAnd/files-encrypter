"use client";
import React, { useState } from "react";

export default function PathSelector({ onPathSelect }: { onPathSelect: (path: string) => void }) {
  const [manualPath, setManualPath] = useState("");

  const handleManualSubmit = () => {
    if (manualPath.trim() !== "") {
      onPathSelect(manualPath.trim());
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-100 rounded-md">
      <label className="font-bold">Enter folder path:</label>

      <input
        type="text"
        placeholder="e.g. C:/Users/YourName/Desktop/test"
        className="p-2 border border-gray-300 rounded"
        value={manualPath}
        onChange={(e) => setManualPath(e.target.value)}
      />

      <button
        onClick={handleManualSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
}
