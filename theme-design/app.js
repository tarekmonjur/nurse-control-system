const http = require('http');
const path = require('path');
const fs = require('fs');
const PORT = 3000;

const app = http.createServer((req, res) => {
    const url = path.parse(req.url);
    let filePath = '';
    let contentType = '';

    if (url.ext === '.html' || url.ext === '') {
        contentType = 'text/html';
        filePath = path.join(__dirname, 'views/', url.base === '' ? 'index.html': url.base);
        console.log(filePath);
    } else if (url.ext === '.css'){
        contentType = 'text/css';
        filePath = path.join(__dirname, 'public/dist', url.base);
        console.log(filePath);
    } else if (url.ext === '.js'){
        contentType = 'text/js';
        filePath = path.join(__dirname, 'public/dist', url.base);
    } else {
        contentType = 'image/png';
        filePath = path.join(__dirname, 'public/img', url.base);
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.log(`File Not Found - ${filePath}`);
                res.writeHead(404);
                res.end(`File Not Found - ${filePath}`);
            } else {
                console.log('Server Error');
                res.writeHead(500);
                res.end('Server Error');
            }
        }

        res.writeHead(200, {'Content-Type': contentType});
        res.end(content, 'utf8');
    });
});

app.listen(PORT, () => {
    console.log(`app listen on port: ${PORT}`);
});
