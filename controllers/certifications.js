const { models } = require('../models/models');
const { Op } = require('sequelize');
const filters = require('../util/filterManager');
const certifications = require('../routes/certifications');

const show = async (req, res, next) => {
  let certifications;
  let keyword = '';
  try {
    const filtro = req.query.filtro;
    certifications = await filters.querySearch(req.query.q);
    if (filtro) {
      certifications = await filters.manager(filtro, req);
    }
    res.render('certifications/show', { certifications, keyword });
  } catch (error) {
    next(error);
  }
};

const renderDetailsPage = async (req, res, next) => {
  try {
    certificationId = req.params.id;
    certification = await filters.findCertificationByPk(certificationId);
    reviews = (await filters.filterReviews(certificationId)).reverse();
    res.render('certifications/details', { certification, reviews });
  } catch (error) {
    next(error);
  }
};

const newReview = async (req, res, next) => {
  try {
    // const omnyUser = await models.Users.findByPk(1); // omnyUser if you dont have create it
    const certification = await filters.findCertificationByPk(req.params.id);
    await filters.addReview(req.body.reviews, certification);
    res.redirect(`/certifications/${req.params.id}`);
  } catch (error) {
    next(error);
  }
};

const recommendation = async (req, res, next) => {
  try {
    res.render('certifications/recommendation');
  } catch (error) {
    next(error);
  }
};

const showRecommendation = async (req, res, next) => {
  try {
    console.log(req.body);
    let keyword = '';
    let institution = true;
    if (!req.body.q1) {
      req.body.q1 = [];
    }
    if (!req.body.q4) {
      req.body.q4 = [];
      institution = false;
    }
    if (typeof req.body.q1 != 'object') {
      req.body.q1 = Array(req.body.q1);
      console.log(req.body.q1);
    }
    if (typeof req.body.q2 != 'object') {
      req.body.q2 = Array(req.body.q2);
      console.log(req.body.q2);
    }
    if (typeof req.body.q4 != 'object') {
      req.body.q4 = Array(req.body.q4);
      console.log(req.body.q4);
    }
    const certifications = await filters.findRecomendations(req.body, institution);
    // console.log(certifications);
    res.render('certifications/show', { certifications, keyword });
  } catch (error) {
    next(error);
  }
};
module.exports = certificationsControllers = {
  show,
  renderDetailsPage,
  newReview,
  recommendation,
  showRecommendation,
};
