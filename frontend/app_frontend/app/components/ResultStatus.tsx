"use client";
import { useContext } from "react";
import { RenameContext } from "../contexts/RenameContext";

export default function ResultStatus() {
  const { results } = useContext(RenameContext);

  return (
    <div className="w-full max-w-3xl bg-gradient-to-br from-violet-50 to-fuchsia-50 shadow-xl rounded-2xl p-8 border border-violet-100">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-semibold text-violet-900">Results</h2>
      </div>

      {results?.error && (
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
          <span className="text-red-500">⚠</span>
          <p className="text-red-600">{results.error}</p>
        </div>
      )}

      {results?.renamed?.length > 0 && (
        <div className="bg-white/70 backdrop-blur-sm border border-violet-100 rounded-xl p-6">
          <ul className="space-y-3">
            {results.renamed.map((entry: any, idx: number) => (
              <li key={idx} className="flex items-center gap-3 text-violet-800">
                <span className="text-violet-700 font-medium">{entry.old}</span>
                <span className="text-violet-400">→</span>
                <span className="text-violet-900">{entry.new}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}