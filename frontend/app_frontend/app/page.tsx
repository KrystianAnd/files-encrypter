"use client";
import { useContext } from "react";
import PathSelector from "./components/PathSelector";
import Console from "./components/Console";
import ResultStatus from "./components/ResultStatus";
import { RenameContext } from "./contexts/RenameContext";
import FileSelector from "./components/FileSelector";

export default function Home() {
  const { folderPath, setFolderPath } = useContext(RenameContext);

  const handlePathSelect = (path: string | null) => {
    setFolderPath(path);
  };

  return (
    <main className="container mx-auto px-4 py-8 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex flex-col space-y-[40px]">
        <PathSelector onPathSelect={handlePathSelect} />
        {folderPath && <Console folderPath={folderPath} />}
        <FileSelector />
        <ResultStatus />
      </div>
    </main>
  );
}
