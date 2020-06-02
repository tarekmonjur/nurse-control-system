const express = require('express');
const router = express.Router();
const { checkAuthenticated, checkJWTAuthenticated } = require(`${appRoot}/lib/passport`);

const authRoute = require('./auth');
const usersRoute = require('./users');
const patientsRoute = require('./patients');

router.use('/login', authRoute);
router.use('/users', usersRoute);
router.use('/patients', checkJWTAuthenticated, patientsRoute);

module.exports = router;