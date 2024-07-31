import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile, faFileCode, faCode
} from "@fortawesome/free-solid-svg-icons";
import {
  faCss3 as faCss3Brand, faHtml5 as faHtml5Brand, faJs as faJsBrand
} from "@fortawesome/free-brands-svg-icons";

// Define a mapping of file extensions to their Font Awesome icons
const fileIcons = {
  'js': faJsBrand,           // JavaScript
  'ts': faCode,             // TypeScript
  'jsx': faCode,            // JSX
  'tsx': faCode,            // TSX
            // Python
  'cpp': faFileCode,        // C++
  'c': faFileCode,          // C
  'h': faFileCode,          // Header file
  'html': faHtml5Brand,     // HTML
  'css': faCss3Brand,       // CSS
  'json': faFileCode,       // JSON
  'xml': faFileCode,        // XML
  'yaml': faFileCode,       // YAML
       // SQL
  'sh': faFileCode,         // Shell script   // Dockerfile    // .gitignore
  'default': faFile         // Default icon for unknown file types
};

const FileIcon = ({ fileName }) => {
  // Extract the file extension from the file name
  const fileExtension = fileName.split('.').pop().toLowerCase();
  
  // Get the appropriate icon for the file extension
  const icon = fileIcons[fileExtension] || fileIcons['default'];
  
  return (
    <span className="mr-2">
      <FontAwesomeIcon icon={icon} />
    </span>
  );
};

export default FileIcon;
