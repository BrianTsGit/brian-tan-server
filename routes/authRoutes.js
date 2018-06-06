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

    app.get('/api/logout', (req, res) => {
        req.logout(); //built in method that passport attached to the req that will delete id from cookie
        res.send(req.user); //this should be empty proving we logged out
    })

    //test route
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};

