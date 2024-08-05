// TerminalComponent.js

import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import socket from '../utils/socket';

const TerminalComponent = () => {
  const terminalRef = useRef(null);
  const fitAddonRef = useRef(new FitAddon());
  const terminalInstanceRef = useRef(null);

  useEffect(() => {
    const terminal = new Terminal();
    terminalInstanceRef.current = terminal;
    terminal.loadAddon(fitAddonRef.current);
    terminal.open(terminalRef.current);
    fitAddonRef.current.fit();

    // Resize the terminal when the window is resized
    const handleResize = () => {
      fitAddonRef.current.fit();
      console.log('Terminal resized.');
    };

    window.addEventListener('resize', handleResize);

    // Handle input from the terminal
    terminal.onData((data) => {
      console.log('Data from terminal:', data);
      socket.emit("terminal:write", data);
    });

    function onTerminalData(data) {
      console.log('Data received from server:', data);
      terminal.write(data);
    }

    socket.on("terminal:data", onTerminalData);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      terminal.dispose();
      console.log('Terminal disposed.');
    };
  }, []);

  useEffect(() => {
    // Fit the terminal whenever there is a change in the parent size
    const observer = new ResizeObserver(() => {
      fitAddonRef.current.fit();
    });

    if (terminalRef.current) {
      observer.observe(terminalRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (terminalRef.current) {
        observer.unobserve(terminalRef.current);
      }
    };
  }, []);

  return (
    <div ref={terminalRef} style={{ width: '100%', height: '100%' }} />
  );
};

export default TerminalComponent;
