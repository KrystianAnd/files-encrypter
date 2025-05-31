"use client";
import { useEffect, useState } from "react";

interface ConsoleProps {
  folderPath: string;
}

export default function Console({ folderPath }: ConsoleProps) {
  const [error, setError] = useState("");

  useEffect(() => {
    if (!folderPath) return;

    const checkPath = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/listfiles/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: folderPath }),
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "An error occurred");
        } else {
          setError("");
        }
      } catch (err) {
        console.error("Connection error:", err);
        setError("Failed to connect to the backend");
      }
    };

    checkPath();
  }, [folderPath]);

  return (
    <div className="w-full max-w-3xl bg-gray-900 shadow-lg rounded-2xl p-8 font-mono text-sm">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-medium text-gray-100">Console Output</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-gray-300">
          <span>Selected path:</span>
          <span className="text-gray-100 font-medium">
            {folderPath || "No path selected"}
          </span>
        </div>

        {error && (
          <div className="flex items-center gap-3 text-red-300 bg-red-900/30 p-4 rounded-xl">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
