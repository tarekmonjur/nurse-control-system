const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const login = require('./src/routes/login');

// app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', './views');
app.use('/', express.static(`${__dirname}/public`));
app.use('/assets', express.static(`${__dirname}/public/dist`));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('home', {title: 'NCS Home Page'});
});

app.use('/login', login);

app.listen(PORT, () => {
    console.log(`server listen on Port: ${PORT}`);
});