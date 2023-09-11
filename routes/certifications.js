const express = require('express');
const Router = express.Router();
const certificationsControllers = require('../controllers/certifications');

module.exports = Router.get('/');
