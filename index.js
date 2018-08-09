const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

//Must require the Mongoose Models in this common file 
require('./models/User');
require('./models/YelpBusiness');
require('./models/MiscInterest');
require('./models/TopRestaurants');
require('./models/FashionCreator');
require('./models/FashionSection');
require('./models/FashionArticle');
require('./services/passport'); //since passport uses mongoose.Users it should come after

//Provide MongoDB credentials to Mongoose
mongoose.connect(keys.mongoURI);

//Create an instance of express
const app = express(); 

const allowCORS = (req, res, next) => { 
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next();
}

//Tell express to use certain middleware
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

//Connect express to routes
require('./routes/authRoutes')(app);
require('./routes/yelpRoutes')(app);
require('./routes/foodRoutes')(app);
require('./routes/miscRoutes')(app);
require('./routes/fashionMagazine/fashionArticleRoutes')(app);

//Error handling middleware
app.use('/api', (err, req, res, next) => {
    res.status(err.status || 500);

    res.send({
        message: err.message
    });
});

//When we deploy to Heroku, the service will inject a PORT for us
//in the enviroment object for us to use
const PORT = process.env.PORT || 5000; 
app.listen(PORT);   