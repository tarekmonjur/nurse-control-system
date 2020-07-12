const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT  = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const bcrypt = require('bcrypt');

const initialize = (passport, getUserByUsername, getUserById) => {
    const authenticateUser = async (username, password, done) => {
        try {
            const user = await getUserByUsername(username);
            if (user && await bcrypt.compare(password, user.password)) {
                return done(null, user, 'Login Success.');
            } else {
                return done(null, false, 'username / password incorrect.')
            }
        } catch(err) {
            return done(err, false, err.message);
        }
    };

    passport.use(
        new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        }, authenticateUser)
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        done(null, await getUserById(id))
    });

    passport.use(
        new JWTStrategy({
            secretOrKey: process.env.SECRET,
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromAuthHeaderAsBearerToken(),
                ExtractJwt.fromHeader('auth-token'),
                ExtractJwt.fromUrlQueryParameter('auth_token'),
            ])
        }, async (jwtPayload, done) => {
            try {
                if (jwtPayload.id && jwtPayload.email) {
                    const user = await getUserById(jwtPayload.id);
                    if (user && user.token !=='') {
                        return done(null, user);
                    }
                }
                return done('Unauthorized', false);
            } catch (err) {
                return done(err, false);
            }
        })
    );
};

const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.data.user = req.user;
        return next();
    }
    return res.redirect('/login');
};

const checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.data.user = req.user;
        return res.redirect('/');
    }
    return next();
};

const checkJWTAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    passport.authenticate('jwt', {session: false}, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                code: 401,
                status: 'error',
                message: err || 'Unauthorized',
                errors: err
            });
        }
        req.user = user;
        return next();
    })(req, res);
};

module.exports = {
    initialize,
    checkAuthenticated,
    checkNotAuthenticated,
    checkJWTAuthenticated
};
