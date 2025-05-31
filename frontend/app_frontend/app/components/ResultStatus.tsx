"use client";
import { useContext } from "react";
import { RenameContext } from "../contexts/RenameContext";

export default function ResultStatus() {
  const { results } = useContext(RenameContext);

  return (
    <div className="w-full  max-w-3xl bg-gray-100 p-4 rounded">
      <h2 className="text-lg font-semibold mb-2">Results:</h2>
      {results?.error && <p className="text-red-500">{results.error}</p>}
      {results?.renamed?.length > 0 && (
        <ul className="space-y-1">
          {results.renamed.map((entry: any, idx: number) => (
            <li key={idx}>
              <span className="text-green-600">{entry.old}</span> ➜ {entry.new}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
