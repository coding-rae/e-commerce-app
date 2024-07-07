const passport = require('passport');
const localStrategy = require('passport-local');

const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();

module.exports = (app) => {

    // Initialise passport 
    app.use(passport.initialize());
    app.use(passport.session());

    //Set method to serialise data to store in cookie
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    //Set method to deserialise data stored in cookie and attach to req user
    passport.deserializeUser((id, done) => {
        done(null, {id} );
    });

    //Config local strategy to be use for local login
    passport.use(new localStrategy(
        async (username, password, done) => {
            try {
                const user = await AuthServiceInstance.login({ email: username, password});
            } catch(err) {
                return done(err);
            }
        }

    ));

    return passport;
}

