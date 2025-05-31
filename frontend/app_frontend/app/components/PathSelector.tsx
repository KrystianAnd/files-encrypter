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
    <div className="w-full max-w-3xl bg-gradient-to-br from-violet-50 to-fuchsia-50 shadow-xl rounded-2xl p-8 border border-violet-100">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-semibold text-violet-900">Path Selection</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-violet-800">Enter folder path</label>
          <input
            type="text"
            placeholder="e.g. C:/Users/YourName/Desktop/test"
            className="w-full px-4 py-3 bg-white border border-violet-200 rounded-lg focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all placeholder-violet-300"
            value={manualPath}
            onChange={(e) => setManualPath(e.target.value)}
          />
        </div>

        <button
          onClick={handleManualSubmit}
          className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-3 px-6 rounded-lg font-medium hover:from-violet-700 hover:to-fuchsia-700 focus:ring-4 focus:ring-violet-200 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Select Folder
        </button>
      </div>
    </div>
  );
}