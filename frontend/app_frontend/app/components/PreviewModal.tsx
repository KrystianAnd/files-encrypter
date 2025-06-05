"use client";
import React from "react";

interface PreviewModalProps {
  visible: boolean;
  files: string[];
  onConfirm: () => void;
  onCancel: () => void;
}

export default function PreviewModal({
  visible,
  files,
  onConfirm,
  onCancel,
}: PreviewModalProps) {
  if (!visible) return null;

  return (
    <div className="flex items-center justify-center">
      <div className="m-4 w-full max-w-lg rounded-2xl flex flex-col items-center">
        
        <div className="mb-6 text-center">
          <h3 className="mb-4 text-lg font-semibold">
            Are you sure you want to rename these files?
          </h3>
          <ul className="text-center space-y-2">
            {files.map((file, idx) => (
              <li key={idx} className="flex justify-center">
                <span>{file}</span>
              </li>
            ))}
          </ul>
        </div>
  
        <div className="mt-6 flex flex-row justify-center gap-[10px]">
          <button 
            onClick={onCancel} 
            className="px-6 py-2 h-[50px] rounded-xl  text-white transition"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="px-6 py-2 h-[50px]  bg-[#FF7A4C] rounded-xl  text-white  transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
  
}