const http = require('http');
const express = require('express');
const fs = require('fs');
const { Server: SocketServer } = require('socket.io');
const path = require('path');
const cors = require('cors');
const chokidar = require('chokidar');
const pty = require('node-pty');

const currentWorkingDirectory = process.cwd();
const ptyProcess = pty.spawn('bash', [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: currentWorkingDirectory + '/user',
    env: process.env
});

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
    cors: {
        origin: '*'
    }
});

app.use(cors());

chokidar.watch('./user').on('all', (event, path) => {
    io.emit('file:refresh', path);
});
chokidar.watch('./user').on('all', async(event, path) => {
    if (['add', 'addDir', 'unlink', 'unlinkDir', 'rename'].includes(event)) {
        const fileTree = await generateFileTree('./user');
        console.log(fileTree);
        io.emit('fileTree:refresh', fileTree);
    }
})
ptyProcess.onData(data => {
    io.emit('terminal:data', data);
});

io.on('connection', (socket) => {
    console.log(`Socket connected`, socket.id);
    ptyProcess.write('\n');
    socket.emit('file:refresh');

    socket.on('file:change', async ({ path, content }) => {
        try {
            console.log('File changed:', path,content);
            await fs.promises.writeFile(`./user${path}`, content);
            socket.emit('file:changed', { path });
        } catch (error) {
            console.error('Error writing file:', error);
            socket.emit('file:error', { error: error.message });
        }
    });

    socket.on('terminal:write', (data) => {
        ptyProcess.write(data);
    });
});

app.get("/", async (req, res) => {
    res.send({
        message: "hello"
    });
});

app.get('/files', async (req, res) => {
    try {
        const fileTree = await generateFileTree('./user');
        return res.json({ tree: fileTree });
    } catch (error) {
        console.error('Error generating file tree:', error);
        return res.status(500).json({ error: error.message });
    }
});

app.get('/files/content', async (req, res) => {
    const filePath = req.query.path;
    try {
        const content = await fs.promises.readFile(`./user${filePath}`, 'utf-8');
        return res.json({ content });
    } catch (error) {
        console.error('Error reading file content:', error);
        return res.status(500).json({ error: error.message });
    }
});

server.listen(9000, () => console.log(`🐳 Docker server running on port 9000`));

async function generateFileTree(dirPath) {
    const structure = [];
    const files = await fs.promises.readdir(dirPath);
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = await fs.promises.stat(filePath);
        if (stat.isDirectory()) {
            structure.push({
                name: file,
                type: 'folder',
                children: await generateFileTree(filePath)
            });
        } else {
            structure.push({
                name: file,
                type: 'file'
            });
        }
    }
    return structure;
}
