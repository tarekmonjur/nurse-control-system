const express = require('express');
const router = express.Router();
const User = require('./../model/User');

router.get('/', async (req, res) => {
    const user = new User;
    const result = await user.find();
    res.json(result);
});

module.exports = router;