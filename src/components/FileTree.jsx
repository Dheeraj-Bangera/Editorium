import React, { useEffect, useState, useRef } from 'react';
import { CiFolderOn, CiFileOn } from 'react-icons/ci';
import { FaFolder } from 'react-icons/fa';
import socket from '../utils/socket';
import path from 'path';
const FileTree = ({ initialTreeData, onSelect ,selectedFile}) => {
    const [expandedFolders, setExpandedFolders] = useState({});
    const [treeData, setTreeData] = useState([]);
    const expandedFoldersRef = useRef(expandedFolders);

    useEffect(() => {
        // Set the initial tree data when the component mounts
        setTreeData(initialTreeData || []);
    }, [initialTreeData]);

    useEffect(() => {
        const handleTreeRefresh = (data) => {
            const newExpandedFolders = { ...expandedFoldersRef.current };
            const mergeFolders = (newTree, path = '') => {
                newTree.forEach((item) => {
                    const currentPath = `${path}/${item.name}`;
                    if (item.type === 'folder' && expandedFoldersRef.current[currentPath]) {
                        newExpandedFolders[currentPath] = true;
                    }
                    if (item.children) {
                        mergeFolders(item.children, currentPath);
                    }
                });
            };
            mergeFolders(data);
            setExpandedFolders(newExpandedFolders);
            setTreeData(data);
        };

        socket.on("fileTree:refresh", handleTreeRefresh);

        // Cleanup listener on component unmount
        return () => {
            socket.off("fileTree:refresh", handleTreeRefresh);
        };
    }, []);

    useEffect(() => {
        expandedFoldersRef.current = expandedFolders;
    }, [expandedFolders]);

    const toggleFolder = (path) => {
        setExpandedFolders((prevState) => ({
            ...prevState,
            [path]: !prevState[path],
        }));
    };

    const renderTree = (structure, parentPath = '') => {
        if (!structure || !Array.isArray(structure)) return null;

        return (
            <>
            
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
            </>
        );
    };

    return <div>
        <p>{selectedFile?selectedFile.replace('/','>'):<div>No file Selected</div>}</p>
        {renderTree(treeData)}</div>;
};

export default FileTree;
