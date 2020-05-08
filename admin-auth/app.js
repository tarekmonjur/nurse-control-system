const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const multer  = require('multer');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const url = require('url');

// app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(`${__dirname}/public`));
app.use('/assets', express.static(`${__dirname}/public/dist`));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 6000000 }
}));

const login = require('./src/routes/login');
const signup = require('./src/routes/signup');
const user = require('./src/routes/user');

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

app.use((req, res, next) => {
    const urlSegments = url.parse(req.url).pathname.split('/');
   if (urlSegments[1] !== 'login' && !req.session.user) {
       // console.log(req.session.user);
       res.redirect('/login');
   } else if (urlSegments[1] === 'login' && req.session.user) {
       res.redirect('/');
   } else {
       next();
   }
});

app.get('/', (req, res) => {
    res.locals.user = {};
    if (req.session.user) {
        res.locals.user = req.session.user;
        // console.log('user', req.session.user);
    }
    res.render('home', {
        title: 'NCS Home Page',
    });
});

app.use('/login', login);
app.use('/signup', upload.single('photo'), signup);
app.use('/users', user);

app.get('/logout', (req, res) => {
   if (req.session.user) {
       req.session.destroy();
       res.redirect('/login');
   } else {
       res.redirect('/');
   }
});

app.listen(PORT, () => {
    console.log(`server listen on Port: ${PORT}`);
});