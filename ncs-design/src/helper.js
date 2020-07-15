const url = require('url');
const path = require('path');

const getURL = (urls) => {
    const parseURL = url.parse(urls, true);
    const parse = path.parse(urls);
    const {
        query,
        pathname,
        href,
    } = parseURL;

    return {
        query,
        pathname,
        href,
        basename: path.basename(urls),
        ext: path.extname(urls) || '.html',
        name: parse.name,
        paths: path.parse(urls)
    }
};


function filePath(urls) {
    let rootPath = "";
    const urlData = getURL(urls);
    const contentType = getContentType(urls);

    if (contentType === 'text/html') {
        rootPath = '../views/';
    } else {
        rootPath = `../${urlData.paths.dir}/`;
    }
    return path.join(__dirname, rootPath,
        urlData.pathname === '/' || urlData.pathname === '/home' ?
        'index.html' : urlData.name+urlData.ext);
}

const getContentType = (urls) => {
    const urlData = getURL(urls);
    let content_type = 'text/html';
    switch (urlData.ext) {
        case '.html':
            content_type = 'text/html';
            break;
        case '.css':
            content_type = 'text/css';
            break;
        case '.js':
            content_type = 'text/javascript';
            break;
        case '.png':
            content_type = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            content_type = 'image/jpg';
            break;
        case '.json':
            content_type = 'application/json';
            break;
        default:
            content_type = 'text/html';
    }
    return content_type;
};

module.exports.getFilePath = filePath;
exports.getURL = getURL;
module.exports.getContentType = getContentType;


// module.exports vs exports
// exports = {
//     getURL,
//     getFilePath: filePath,
// };

// module.exports = {
//     getURL,
//     getFilePath: filePath,
// };




