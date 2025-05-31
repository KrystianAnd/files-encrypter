"use client";
import { useContext } from "react";
import PathSelector from "./components/PathSelector";
import Console from "./components/Console";
import ResultStatus from "./components/ResultStatus";
import { RenameContext } from "./contexts/RenameContext";
import FileSelector from "./components/FileSelector";
import PreviewModal from "./components/PreviewModal";

export default function Home() {
  const { folderPath, setFolderPath } = useContext(RenameContext);

  const handlePathSelect = (path: string) => {
    setFolderPath(path);
  };

  return (
    <main className="max-w-[1500px] flex flex-col items-center p-6 space-y-6">
      <PathSelector onPathSelect={handlePathSelect} />
      <Console folderPath={folderPath} />
      <FileSelector />
      <ResultStatus />
    </main>
  );
}
