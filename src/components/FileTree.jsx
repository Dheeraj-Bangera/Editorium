import React, { useState } from 'react';
import { CiFolderOn, CiFileOn } from 'react-icons/ci';
import { FaFolder } from 'react-icons/fa';
import { FileIcon, defaultStyles } from 'react-file-icon'
const FileTree = ({ treeData, onSelect }) => {
    const [expandedFolders, setExpandedFolders] = useState({});

    const toggleFolder = (path) => {
        setExpandedFolders((prevState) => ({
            ...prevState,
            [path]: !prevState[path],
        }));
    };

    const renderTree = (structure, parentPath = '') => {
        if (!structure || !Array.isArray(structure)) return null;

        return (
            <ul className="ml-4 list-none">
                {structure.map((item, index) => {
                    const currentPath = `${parentPath}/${item.name}`;
                    return (
                        <li key={index} className="my-2">
                            {item.type === 'folder' ? (
                                <>
                                    <span
                                        onClick={() => toggleFolder(currentPath)}
                                        className="cursor-pointer flex items-center"
                                    >
                                        {expandedFolders[currentPath] ? (
                                            <CiFolderOn className="mr-2" />
                                        ) : (
                                            <FaFolder className="mr-2" />
                                        )}
                                        <strong>{item.name}</strong>
                                    </span>
                                    {expandedFolders[currentPath] &&
                                        item.children &&
                                        renderTree(item.children, currentPath)}
                                </>
                            ) : (
                                <span
                                    className="flex items-center cursor-pointer"
                                    onClick={() => onSelect(currentPath)}
                                >
                                    <CiFileOn className='mr-2'></CiFileOn>{item.name}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return <div>{renderTree(treeData)}</div>;
};

export default FileTree;
