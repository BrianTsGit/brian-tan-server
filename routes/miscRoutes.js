const mongoose = require('mongoose');

const MiscInterest = mongoose.model('miscInterests');

module.exports = (app) => {
    app.route('/api/misc/miscInterests')
        .get((req, res) => {
            MiscInterest.find()
                .then(interests => res.json(interests));
        })
        .post((req, res) => {
            console.log(req.body);
            new MiscInterest(req.body).save()
                .then(interest => res.json(interest));
        });
}