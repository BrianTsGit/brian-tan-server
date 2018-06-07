const keys = require('../config/keys');
const passport = require('passport'); //passport library
const GoogleStrategy = require('passport-google-oauth20').Strategy; //passposrt google strategy
const mongoose = require('mongoose');

const User = mongoose.model('users'); //this is how you import/require a model from mongoose

//Note: 'done' is a callback function that takes an error method as first arg
//and as second arg it will return what ever you specify

//takes a user and gives back the user id to be passed with the cookie
passport.serializeUser((user, done) => {
    done(null, user.id); //here we use the mongo id NOT the googleId
});

//takes the id from the cookie and gives a user back...
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => done(null, user));
});

passport.use( //configure passport to use GoogleStrategy
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        }, 
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id })
                .then(existingUser => {
                    if (existingUser) {
                        done(null, existingUser);
                    } else {
                        new User({ googleId: profile.id }).save()
                            .then(user => done(null, user));
                    }
                });
        }
    )
);