const Router = require('express').Router();

const UserRouter = require('./UserRouter');
const ServiceRouter = require('./ServiceRouter');
const ReviewRouter = require('./ReviewRouter');
// const BookRouter = require('./BookRouter');

Router.use('/users', UserRouter);
Router.use('/services', ServiceRouter);
Router.use('/reviews', ReviewRouter);
// Router.use('/book', BookRouter);

module.exports = Router;
