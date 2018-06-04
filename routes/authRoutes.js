const passport = require('passport');

module.exports = (app) => {
    //when user hits this endpoint, initiate the passport google flow
    //here the user is granting access to google to give our app a code to have access to their info
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    //here we are using the code we get to show google and exchange it for the users info
    app.get('/auth/google/callback', passport.authenticate('google'));
};

