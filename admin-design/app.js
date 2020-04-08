const express = require('express');
const app = express();

// app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', './views');
app.use('/assets', express.static(`${__dirname}/public/dist`));

app.get('/', (req, res) => {
    res.render('home', {title: 'NCS Home Page'});
});

app.listen(3000, () => {
    console.log('server listen....');
});