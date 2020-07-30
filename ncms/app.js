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
const mqtt = require('./src/lib/mqtt');
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
   resave: true,
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

(async () => {
   const jwt = require('jsonwebtoken');
   const http = require('http');
   const server = http.createServer(app);
   const io = require('socket.io')(server, {path: '/ncms'});

   // io middleware
   io.use((socket, next) => {
      try {
         let token = socket.handshake.query.token;
         jwt.verify(token, process.env.SECRET);
         return next();
      } catch (err) {
         console.log('io unauthorized');
         return next(new Error('io authentication error'));
      }
   });

   io.origins(['*:*']);
   io.on('connection', (client) => {
      let token = client.handshake.query.token;
      console.log('server io connected : ', token);
   });

   await mqtt.patientNurseCallHandle(io);

   const PORT = process.env.EXPRESS_PORT || 8000;
   server.listen(PORT, () => {
      console.log(`server listen on PORT ${PORT}`);
   });

})();