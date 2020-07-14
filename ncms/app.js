const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
require('dotenv').config();
// global.appRoot = path.resolve(__dirname, 'src');
require('./src/lib/db');
const pagesRoute = require('./src/routes/pages');
const apiRoute = require('./src/routes/api');


app.disable('x-powered-by');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public/dist')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
   secret: process.env.SECRET,
   resave: false,
   saveUninitialized: false,
   cookie: { secure: false, maxAge: 600000 }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', pagesRoute);
app.use('/api', apiRoute);

app.use('*', (req, res, next) => {
   next({
      code: 404,
      message: 'Page not found.',
      body: ''
   });
});

app.use((err, req, res, next) => {
   console.error(err.stack);
   const errCode = err.code || 500;
   res.status(errCode);
   res.render('error', {
      error: {
         code: errCode,
         message: err.message,
         body: err.stack
      }
   });
});

const PORT = process.env.EXPRESS_PORT || 8000;
app.listen(PORT, () => console.log(`server listen on PORT ${PORT}`));