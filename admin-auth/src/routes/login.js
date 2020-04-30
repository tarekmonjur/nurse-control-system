const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {
    const formInput = req.body;
    console.log({formInput});
    res.json(formInput);
});

module.exports = router;