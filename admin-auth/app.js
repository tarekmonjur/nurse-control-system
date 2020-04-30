const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const multer  = require('multer');

const PORT = process.env.PORT || 3000;
const login = require('./src/routes/login');
const signup = require('./src/routes/signup');

// app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', './views');
app.use('/', express.static(`${__dirname}/public`));
app.use('/assets', express.static(`${__dirname}/public/dist`));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '.' + file.originalname.split('.')[1];
        cb(null, file.originalname.split('.')[0] + '-' + uniqueSuffix)
    }
});
const upload = multer({ storage: storage});

app.get('/', (req, res) => {
    res.render('home', {title: 'NCS Home Page'});
});

app.use('/login', login);
app.use('/signup', upload.single('photo'), signup);

app.listen(PORT, () => {
    console.log(`server listen on Port: ${PORT}`);
});