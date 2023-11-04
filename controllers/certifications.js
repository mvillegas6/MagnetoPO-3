const { models } = require('../models/models');
const { Op } = require('sequelize');
const filters = require('../util/filterManager');


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

module.exports = certificationsControllers = {
  show,
  renderDetailsPage,
  newReview,
};
