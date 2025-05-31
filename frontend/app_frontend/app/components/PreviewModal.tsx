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
    <div className=" flex items-center justify-center bg-violet-950/30 backdrop-blur-sm">
      <div className="m-4 w-full max-w-lg rounded-2xl border border-violet-100 bg-gradient-to-br from-white to-violet-50 p-8 shadow-2xl">
        <div className="mb-6 flex items-center gap-3">
          <h2 className="text-2xl font-semibold text-violet-900">
            Confirm Changes
          </h2>
        </div>

        <div className="mb-6 rounded-xl border border-violet-100 bg-white/90 p-6 backdrop-blur-sm">
          <p className="mb-4 text-violet-800">
            Are you sure you want to rename these files?
          </p>
          <ul className="max-h-[200px] space-y-2 overflow-y-auto">
            {files.map((file, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 rounded-lg p-2 text-violet-700 hover:bg-violet-50"
              >
                <span>{file}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-violet-200 bg-white px-6 py-2.5 text-violet-700 transition-all hover:bg-violet-50 focus:ring-4 focus:ring-violet-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-2.5 text-white transition-all hover:from-violet-700 hover:to-purple-700 focus:ring-4 focus:ring-violet-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}