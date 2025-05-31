"use client";
import { createContext, useState } from "react";

export const RenameContext = createContext<any>({});

export function RenameProvider({ children }: { children: React.ReactNode }) {
  const [folderPath, setFolderPath] = useState("");
  const [results, setResults] = useState(null);
  const [previewRenames, setPreviewRenames] = useState(null); 

  return (
    <RenameContext.Provider
      value={{
        folderPath,
        setFolderPath,
        results,
        setResults,
        previewRenames,
        setPreviewRenames, 
      }}
    >
      {children}
    </RenameContext.Provider>
  );
}
