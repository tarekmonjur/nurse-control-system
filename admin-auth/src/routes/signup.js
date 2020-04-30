const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('signup');
});

router.post('/', (req, res) => {
    const payload = req.body;
    console.log(JSON.stringify(req.file));
    res.json(payload);
});

module.exports = router;

