const express = require('express');
const router = express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('./../lib/passport');
const userService = require('./../services/user.service');
const patientService = require('./../services/patient.service');
const nurseService = require('./../services/nurse.service');
const doctorService = require('./../services/doctor.service');

router.use((req, res, next) => {
    if (req.path) {
        res.locals.data = Object.assign({}, res.locals, {route: ''});
        res.locals.data.route = req.path.split('/')[1];
    }
    next();
});

router.get('/login', checkNotAuthenticated, (req, res) => {
    return res.render('login');
});

router.get('/logout', checkAuthenticated, (req, res) => {
    req.logout();
    return res.redirect('/login');
});

router.get('/', checkAuthenticated, (req, res) => {
    return res.render('home');
});

router.get('/patients', checkAuthenticated, async (req, res) => {
    try {
        const beds = await patientService.getAllBeds();
        res.locals.data.beds = beds;
    } catch (err) {
        console.log(err.message);
    }
    return res.render('patient');
});

router.get('/beds', checkAuthenticated, (req, res) => {
    return res.render('bed');
});

router.get('/doctors', checkAuthenticated, async (req, res) => {
    try {
        const nurses = await doctorService.getAllNurses();
        res.locals.data.nurses = nurses;
    } catch (err) {
        console.log(err.message);
    }
    return res.render('doctor');
});

router.get('/nurses', checkAuthenticated, async (req, res) => {
    try {
        const doctors = await nurseService.getAllDcotors();
        res.locals.data.doctors = doctors;
    } catch (err) {
        console.log(err.message);
    }
    return res.render('nurse');
});

router.get('/call-history', checkAuthenticated, (req, res) => {
    return res.render('call_history');
});

router.get('/real-time-call', checkAuthenticated, (req, res) => {
    return res.render('real_time_call');
});

// router.get('/reports', checkAuthenticated, (req, res) => {
//     return res.render('report');
// });

router.get('/daily-patient-nurse-call-reports', (req, res) => {
    return res.render('daily_patient_nurse_report');
});

router.get('/monthly-patient-nurse-call-reports', (req, res) => {
    return res.render('monthly_patient_nurse_report');
});

router.get('/users', checkAuthenticated, async (req, res) => {
    try {
        const user_groups = await userService.getUserGroups();
        res.locals.data.user_groups = user_groups;
    } catch (err) {
        console.log(err.message);
    }

    return res.render('user');
});

module.exports = router;