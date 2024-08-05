import React, { useEffect, useState } from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import socket from '../utils/socket';
import { FaRegClipboard } from "react-icons/fa6";
import { FaClipboardCheck } from "react-icons/fa6";
import Clipboard from './ui/Clipboard';

const CodeEditor = ({selectedFile}) => {

  
  const [code, setCode] = useState("// select an existing file or create a new one \n//happy coding :)")
  
  const getData = async(selectedFile)=>{
    console.log(selectedFile);
    const response = await fetch(`http://localhost:9000/files/content?path=${selectedFile}`);
    const result = await response.json();
    console.log(result);
    setCode(result.content);
  }
  useEffect(() => {
    if(selectedFile) {
      getData(selectedFile);
    }
  }, [selectedFile])
  const handleChange = (newContent) => {
    setCode(newContent);
    console.log(newContent);

    setTimeout(() => {
        socket.emit("file:change", { path: selectedFile, content: newContent });
    }, 2000);
};
  return (
    <div className="w-full h-full relative  bg-gray-900 text-white">
      <Clipboard code={code}></Clipboard>
      <AceEditor 
        height="100%"
        width="100%"
        value={code}
        onChange={handleChange}
        mode="javascript"
        theme="monokai"
        fontSize="16px"
        highlightActiveLine={true}
        setOptions={{
          enableLiveAutocompletion: true,
          showLineNumbers: true,
          tabSize: 2,
          showGutter: true,
          showPrintMargin: false,
          useWorker: false,
          displayIndentGuides: true,
          foldStyle: 'markbegin',
          behavioursEnabled: true,
        }}
      />
    </div>
  );
}

export default CodeEditor;
