const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./models/YelpBusiness');
require('./services/passport'); //since passport uses mongoose.Users it should come after

mongoose.connect(keys.mongoURI);

const app = express(); 

const allowCORS = (req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

app.use(allowCORS); 
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/* Setup passport to use cookie session begin*/
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
/* done */

require('./routes/authRoutes')(app);
require('./routes/yelpRoutes')(app);
require('./routes/foodRoutes')(app);

//When we deploy to Heroku, the service will inject a PORT for us
//in the enviroment object for us to use
const PORT = process.env.PORT || 5000; 
app.listen(PORT);   