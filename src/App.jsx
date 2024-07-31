import React, { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeEditor from "./CodeEditor";
import TerminalComponent from "./Terminal";
import "./App.css"; // Ensure this path is correct
import FileTree from "./components/FileTree";

const App = () => {
  const [fileTree, setFileTree] = useState(null);

  const getFileTree = async () => {
    const response = await fetch("http://localhost:9000/files");
    const result = await response.json();
    console.log(result);
    setFileTree(result.tree);
  };
 
  useEffect(() => {
    getFileTree();
  }, []);

  const handleSelect = (path) => {
    console.log('Selected file:', path);
  };
  return (
    <div className="App h-screen">
      <PanelGroup direction="horizontal" style={{ height: "100%" }}>
        <Panel defaultSize={20} minSize={10}>
          <div className="file-explorer bg-slate-600 h-full">
          <FileTree treeData={fileTree} onSelect={handleSelect} />
          </div>
        </Panel>
        <PanelResizeHandle className="resize-handle" />
        <Panel>
          <PanelGroup direction="vertical" style={{ height: "100%" }}>
            <Panel defaultSize={50} minSize={20}>
              <CodeEditor />
            </Panel>
            <PanelResizeHandle className="resize-handle" />
            <Panel minSize={20} defaultSize={30}>
              <TerminalComponent />
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default App;
