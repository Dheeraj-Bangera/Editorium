import React, { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeEditor from "../components/CodeEditor";
import TerminalComponent from "../components/Terminal";
import "./codeRoom.css"; 
import FileTree from "../components/FileTree";
function CodeRoom() {
    const [fileTree, setFileTree] = useState(null);
    const [selectedFile,setSelectedFile]=useState(null);
  
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
      setSelectedFile(path);
    };
    return (
      <div className="App h-screen  bg-gray-900 text-white">
        <PanelGroup direction="horizontal" style={{ height: "100%" }}>
          <Panel defaultSize={20} minSize={10}>
            <div className="file-explorer bg-gray-900 text-white h-full">
            <FileTree initialTreeData={fileTree} selectedFile={selectedFile} onSelect={handleSelect} />
            </div>
          </Panel>
          <PanelResizeHandle className="resize-handle" />
          <Panel>
            <PanelGroup direction="vertical" style={{ height: "100%" }}>
              <Panel defaultSize={50} minSize={20}>
                <CodeEditor selectedFile={selectedFile}/>
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
}

export default CodeRoom