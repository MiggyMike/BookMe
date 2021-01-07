const Router = require('express').Router();
const ReviewController = require('../controllers/ReviewController');

Router.post('/:service_id/user/:user_id', ReviewController.CreateReview);
Router.put('/:review_id', ReviewController.UpdateReview);
Router.delete('/:service_id/remove/:review_id', ReviewController.RemoveReview);

module.exports = Router;
