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
    <div className="w-full flex justify-center text-center">
      <div className="space-y-4">
        <div className="flex items-center ">
          <span>Selected path:</span>
          <span className="text-gray-100 font-medium">
            {folderPath || "No path selected"}
          </span>
        </div>

        {error && (
          <div className="flex items-center ">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
