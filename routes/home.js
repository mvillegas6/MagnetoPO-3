const express = require('express');
const Router = express.Router();
const homeControllers = require('../controllers/home');

module.exports = Router.get('/', homeControllers.main);
