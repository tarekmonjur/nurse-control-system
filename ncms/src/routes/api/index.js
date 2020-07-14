const express = require('express');
const router = express.Router();
const { checkAuthenticated, checkJWTAuthenticated } = require('./../../lib/passport');

const authRoute = require('./auth');
const usersRoute = require('./users');
const patientsRoute = require('./patients');
const bedsRoute = require('./beds');
const doctorsRoute = require('./doctors');
const nursesRoute = require('./nurses');
const callHistoryRoute = require('./call_histories');
const RealTimeCallRoute = require('./real_time_call');
const ReportRoute = require('./reports');

router.use('/login', authRoute);
router.use('/users', usersRoute);
router.use('/patients', checkJWTAuthenticated, patientsRoute);
router.use('/beds', checkJWTAuthenticated, bedsRoute);
router.use('/doctors', checkJWTAuthenticated, doctorsRoute);
router.use('/nurses', checkJWTAuthenticated, nursesRoute);
router.use('/call-histories', checkJWTAuthenticated, callHistoryRoute);
router.use('/real-time-call', checkJWTAuthenticated, RealTimeCallRoute);
router.use('/reports', checkJWTAuthenticated, ReportRoute);

module.exports = router;