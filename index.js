const express = require('express');
require('./services/passport');

const app = express(); 

const allowCORS = (req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}
app.use(allowCORS); 

require('./routes/authRoutes')(app);
require('./routes/yelpRoutes')(app);

//When we deploy to Heroku, the service will inject a PORT for us
//in the enviroment object for us to use
const PORT = process.env.PORT || 5000; 
app.listen(PORT); 