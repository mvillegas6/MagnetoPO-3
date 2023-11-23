const express = require('express');
const Router = express.Router();
const certificationsControllers = require('../controllers/certifications');

module.exports = Router.get('/', certificationsControllers.show)
  .get('/recommendation', certificationsControllers.recommendation)
  .post('/recommendation', certificationsControllers.showRecommendation)
  .get('/:id', certificationsControllers.renderDetailsPage)
  .post('/:id', certificationsControllers.newReview);
