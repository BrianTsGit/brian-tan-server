const axios = require('axios'); 
const keys = require('../config/keys');

const axiosYelpInstance = axios.create({
    baseURL: 'https://api.yelp.com/v3/',
    headers: {'Authorization': 'Bearer ' + keys.yelpAPIKey}
});

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

module.exports = (app) => {
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
}