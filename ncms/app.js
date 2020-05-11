const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const url = require('url');

const auth = require('./src/routes/auth');
const patient = require('./src/routes/patient');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public/dist')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
   const segments = url.parse(req.url).pathname.split('/');
   if (segments[1] !== 'login')
      res.locals.user = {name: 'tarek'};
   next();
});

app.use('/login', auth);
app.use('/patient', patient);

app.get('/', (req, res) => {
   res.render('home');
});



app.use('*', (req, res, next) => {
   next({
      code: 404,
      message: 'Page not found.',
      body: ''
   });
});

app.use((err, req, res, next) => {
   console.error(err.stack);
   const errCode = 503;
   res.status(errCode);
   res.render('error', {
      error: {
         code: err.code || errCode,
         message: err.message,
         body: err.stack
      }
   });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server listen on PORT ${PORT}`));