const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({hi: 'there'});
});

//When we deploy to Heroku, the service will inject a PORT for us
//in the enviroment object for us to use
const PORT = process.env.PORT || 5000; 
app.listen(PORT); 