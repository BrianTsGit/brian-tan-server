const keys = require('../config/keys');
const passport = require('passport'); //passport library
const GoogleStrategy = require('passport-google-oauth20').Strategy; //passposrt google strategy

passport.use( //configure passport to use GoogleStrategy
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        }, 
        (accessToken, refreshToken, profile, done) => {
            console.log('access token', accessToken);
            console.log('refresh token', refreshToken);
            console.log('profile', profile);
        }
    )
);