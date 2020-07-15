const http = require('http');
const fs = require('fs');
const path = require('path');
const helper = require('./src/helper');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const filePath = helper.getFilePath(req.url);
    const contentType = helper.getContentType(req.url);

    fs.readFile(filePath, (err, content) => {
       if (err) {
           if (err.code === 'ENOENT') {
               fs.readFile(path.join(__dirname, 'views', '404.html'), (err, data) => {
                   res.writeHead(200, {'Content-Type': 'text/html'});
                   res.end(data, 'utf8');
               });
           } else {
               res.writeHead(500);
               res.end(`Server Error: ${err.code}`);
           }
       } else {
           res.writeHead(200, {'Content-Type': contentType});
           res.end(content, 'utf8');
       }
    });


    // if (urlData.pathname === '/') {
    //     res.writeHead(200, {'Content-Type': 'text/html'});
    //     fs.readFile(filePath, (err, data) => {
    //         if (err) {
    //             throw err;
    //         }
    //         res.end(data.toString('utf8'));
    //         res.end(data, 'utf8');
    //     });
    //
    // } else if (urlData.pathname === 'public') {
    //
    // }
    // else {
    //     // res.writeHead(200, {'Content-Type': 'application/json'});
    //     res.writeHead(200, {'Content-Type': 'text/html'});
    //     res.write(path.basename(urlData.pathname));
    //     res.write(path.dirname(urlData.pathname));
    //     res.write(JSON.stringify(path.parse(urlData.pathname)));
    //     // res.write(JSON.stringify(urlData));
    //     res.end();
    // }
});

server.listen(PORT, () => console.log(`server listen... on PORT ${PORT}`));

