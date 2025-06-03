"use client";
import { useContext } from "react";
import { RenameContext } from "../contexts/RenameContext";

export default function ResultStatus() {
  const { results } = useContext(RenameContext);

  return (
    <div className="w-full  flex items-center justify-center">
      <div className="flex flex-col text-center max-w-xl w-full px-4">
        <div className="flex items-center justify-center gap-3 mb-6">
          <h2 className="text-2xl font-semibold text-violet-900">Results</h2>
        </div>

        {results?.error && (
          <div className="p-6 bg-red-50 border border-red-200 rounded-xl flex items-center justify-center gap-3">
            <span className="text-red-500">⚠</span>
            <p className="text-red-600">{results.error}</p>
          </div>
        )}

        {results?.renamed?.length > 0 && (
          <div className="p-6 bg-green-50 border rounded-xl">
            <ul className="space-y-3">
              {results.renamed.map((entry: any, idx: number) => (
                <li key={idx} className="flex items-center justify-center gap-3">
                  <span className="font-medium">{entry.old}</span>
                  <span>→</span>
                  <span className="text-bold ">{entry.new}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
