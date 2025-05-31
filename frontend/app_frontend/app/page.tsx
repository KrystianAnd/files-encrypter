"use client";
import { useContext } from "react";
import PathSelector from "./components/PathSelector";
import Console from "./components/Console";
import ResultStatus from "./components/ResultStatus";
import FileSelector from "./components/FileSelector";
import { RenameContext } from "./contexts/RenameContext";

export default function Home() {
  const { folderPath, setFolderPath } = useContext(RenameContext);

  const handlePathSelect = (path: string) => {
    setFolderPath(path);
    console.log("Wybrana ścieżka:", path);
  };

  return (
    <main className="flex flex-col items-center p-6 space-y-6">
      <PathSelector onPathSelect={handlePathSelect} />
      <Console folderPath={folderPath} />
      <FileSelector />
      <ResultStatus />
    </main>
  );
}
