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

const formatAutocompleteData = data => {
    const autocompleteSuggestions = [];
    if (data.categories) {
        autocompleteSuggestions.concat(data.categories.map(cat => {
            return cat.title;
        }));
    }
    if (data.businesses) {
        autocompleteSuggestions.concat(data.businesses.map(bus => {
            return bus.name;
        }));
    }
    if (data.terms) {
        autocompleteSuggestions.concat(data.terms.map(term => {
            return term.text;
        }));
    }
    return autocompleteSuggestions;
}

module.exports = (app) => {
    app.get('/api/yelp/businesses/search', (req, res, next) => {
        axiosYelpInstance.get('/businesses/search?term=' + req.query.term + '&location=' + req.query.location)
            .then(response => {
                const formattedData = formatYelpBusinessData(response.data);
                res.json(formattedData);
            })
            .catch(err => {
                next(err);
            });
    });

    app.get('/api/yelp/autocomplete', (req, res, next) => {
        axiosYelpInstance.get('autocomplete?text=' + req.query.term)
            .then(response => {
                const formattedData = formatAutocompleteData(response.data);
                res.json(formattedData)
            })
            .catch(err => {
                next(err);
            });
    });
}
