const mongoose = require('mongoose');

const FashionArticle = mongoose.model('FashionArticle');
const FashionCreator = mongoose.model('FashionCreator');
const FashionSection = mongoose.model('FashionSection');

const createFashionArticle = (fashionArticle, creatorId) => {
    let createdOnDate = new Date();

    return {
        title: fashionArticle.title,
        image_url: fashionArticle.image_url,
        creator: creatorId,
        section: fashionArticle.section._id,
        category: fashionArticle.category,
        article_url: fashionArticle.article_url,
        created_on: createdOnDate,
        updated_on: createdOnDate
    };
}

module.exports = (app) => {
    app.route('/api/fashionMagazine/fashionArticles')
        .get((req, res, next) => {
            FashionArticle
                .find()
                .populate('creator')
                .populate('section')
                .then(fashionArticles => res.json(fashionArticles))
                .catch(next);
        });

    app.route('/api/fashionMagazine/fashionArticles/:id')
        .get((req, res, next) => {
            FashionArticle
                .findById(req.params.id)
                .populate('creator')
                .populate('section')
                .then(fashionArticle => res.json(fashionArticle))
                .catch(next);
        });

    app.route('/api/fashionMagazine/fashionArticles')
        .post((req, res, next) => {
            if (!req.body.creator.name)
                next({ message: 'Invalid input.' });

            FashionCreator.findOne({ name: req.body.creator.name }, '_id')
                .then(existingCreator => {
                    if (!existingCreator) {
                        new FashionCreator({ name: req.body.creator.name }).save()
                            .then(newCreator => {
                                new FashionArticle(createFashionArticle(req.body, newCreator._id)).save()
                                    .then(fashionArticle => res.json(fashionArticle._id))
                                    .catch(next);
                            })
                    } else {
                        new FashionArticle(createFashionArticle(req.body, existingCreator._id)).save()
                            .then(fashionArticle => res.json(fashionArticle._id))
                            .catch(next);
                    }
                })
                .catch(next);
        });

    app.route('/api/fashionMagazine/fashionArticles/:id')
        .put((req, res, next) => {
            FashionArticle.findById(req.params.id)
                .then(fashionArticle => {
                    if (fashionArticle.creator != req.body.creator._id) {
                        //check if this creator already exists
                        FashionCreator.findOne({ name: req.body.creator.name })
                            .then(existingCreator => {
                                //if new creator, input into db first
                                if (!existingCreator) {
                                    new FashionCreator({ name: req.body.creator.name }).save()
                                        .then(newCreator => {
                                            fashionArticle.title = req.body.title;
                                            fashionArticle.image_url = req.body.image_url;
                                            fashionArticle.creator = newCreator._id; //note we set this to just he object id
                                            fashionArticle.section = req.body.section._id; //note we set this to just he object id
                                            fashionArticle.category = req.body.category;
                                            fashionArticle.article_url = req.body.article_url;
                                            fashionArticle.updated_on = new Date();

                                            fashionArticle.save()
                                                .then(fashionArticle => res.json(fashionArticle._id))
                                                .catch(next);
                                        })
                                        .catch(next);
                                } else {
                                    fashionArticle.title = req.body.title;
                                    fashionArticle.image_url = req.body.image_url;
                                    fashionArticle.creator = existingCreator._id; //note we set this to just he object id
                                    fashionArticle.section = req.body.section._id; //note we set this to just he object id
                                    fashionArticle.category = req.body.category;
                                    fashionArticle.article_url = req.body.article_url;
                                    fashionArticle.updated_on = new Date();

                                    fashionArticle.save()
                                        .then(fashionArticle => res.json(fashionArticle._id))
                                        .catch(next);
                                }
                            })
                            .catch(next);
                    }
                })
                .catch(next);
        });
    
    app.route('/api/fashionMagazine/fashionArticles/:id')
        .delete((req, res, next) => {
            FashionArticle.findById(req.params.id)
                .then(fashionArticle => {
                    fashionArticle.remove();
                })
                .catch(next);
        });
}