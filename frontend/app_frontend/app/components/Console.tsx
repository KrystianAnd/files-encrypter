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
    <div className="w-full max-w-3xl bg-black text-green-400 p-4 rounded-md font-mono text-sm min-h-[100px] space-y-2">
      <p>Selected path: <span className="text-white">{folderPath || "No path selected"}</span></p>
      {error && <p className="text-red-400"> {error}</p>}
    </div>
  );
}
