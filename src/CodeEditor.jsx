// CodeEditor.js

import React from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

const CodeEditor = () => {
  const code = "var message = 'Monaco Editor!' \nconsole.log(message);";

  return (
    <div className="w-full h-full p-2 bg-gray-100 border border-gray-300">
      <AceEditor 
        height="100%"
        width="100%"
        value={code}
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
