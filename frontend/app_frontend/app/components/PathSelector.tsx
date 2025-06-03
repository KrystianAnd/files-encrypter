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
    <div className="w-full flex justify-center items-center gap-4  ">
      <input
        type="text"
        placeholder="Enter folder path here"
        className="max-w-[60%] w-full h-[50px] text-center px-6 py-5 text-2xl bg-white border border-gray-200 text-gray-700 rounded-full shadow placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
        value={manualPath}
        onChange={(e) => setManualPath(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleManualSubmit()}
      />

      <button
        onClick={handleManualSubmit}
        className="h-[50px] w-[100px] bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xl py-4 px-8 rounded-full shadow transition-all active:scale-95"
      >
        Confirm
      </button>
    </div>
  );
}
