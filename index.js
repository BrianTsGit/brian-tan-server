const keys = require('./config/keys');
const express = require('express');
const passport = require('passport'); //passport library
const GoogleStrategy = require('passport-google-oauth20').Strategy; //passposrt google strategy
const axios = require('axios'); //http request library 
const axiosYelpInstance = axios.create({
    baseURL: 'https://api.yelp.com/v3/',
    headers: {'Authorization': 'Bearer ' + keys.yelpAPIKey}
});

const app = express(); //create express app

const allowCORS = (req, res, next) => { //allow CORS in our server
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

app.use(allowCORS); //apply CORS

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

/* YELP API Helper Methods BEGIN */
const formatYelpBusinessData = businessData => {
    let formattedData = businessData.businesses.map(b => {
        return {
            id: b.id,
            name: b.name,
            image_url: b.image_url,
            url: b.url,
            review_count: b.review_count,
            rating: b.rating,
            price: b.price,
            categories: b.categories.map(c => c.title).join(', '),
            location: b.location
        };
    });

    return formattedData;
}
/* YELP API Helper Methods END */

//when user hits this endpoint, initiate the passport google flow
//here the user is granting access to google to give our app a code to have access to their info
app.get(
    '/auth/google', 
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

//here we are using the code we get to show google and exchange it for the users info
app.get(
    '/auth/google/callback',
    passport.authenticate('google')
)

app.get('/yelp/businesses/search', (req, res) => {
    let searchURL = '/businesses/search?term=' + req.query.term + '&location=' + req.query.location;
    axiosYelpInstance.get(searchURL)
        .then(response => {
            const formattedData = formatYelpBusinessData(response.data);
            res.json(formattedData);
        })
        .catch(err => {
            res.send({error: 'Something Fudged Up!'});
        });
});

//When we deploy to Heroku, the service will inject a PORT for us
//in the enviroment object for us to use
const PORT = process.env.PORT || 5000; 
app.listen(PORT); 