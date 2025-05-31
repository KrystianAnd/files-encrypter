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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Are you sure you want to rename these files?</h2>
        <ul className="max-h-40 overflow-y-auto mb-4 text-sm border p-2 rounded">
          {files.map((file, idx) => (
            <li key={idx} className="text-gray-700">{file}</li>
          ))}
        </ul>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
