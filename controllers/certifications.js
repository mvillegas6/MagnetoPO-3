const { models } = require('../models/models');
const { Op } = require('sequelize');

const show = async (req, res, next) => {
  let certifications;
  let keyword = '';
  try {
    // Search by name
    if (req.query.q) {
      keyword = req.query.q;
      certifications = await models.Certifications.findAll({
        where: {
          name: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
      });
    } else {
      certifications = await models.Certifications.findAll();
    }
    res.render('certifications/show', { certifications, keyword });
  } catch (error) {
    next(error);
  }
};

const renderDetailsPage = async (req, res, next) => {
  try {
    certification = await models.Certifications.findByPk(req.params.id);
    reviews = (
      await models.Reviews.findAll({
        include: {
          model: models.CertificationReviews,
          where: {
            certificationId: req.params.id,
          },
        },
      })
    ).reverse();
    console.log(reviews);
    res.render('certifications/details', { certification, reviews });
  } catch (error) {
    next(error);
  }
};

const newReview = async (req, res, next) => {
  try {
    // const omnyUser = await models.Users.findByPk(1); // omnyUser if you dont have create it
    const certification = await models.Certifications.findByPk(req.params.id);
    const review = await models.Reviews.create({
      rating: req.body.reviews.rating,
      comment: req.body.reviews.body,
      author: 'OmnyUser',
    });
    await certification.addReviews(review, { through: { selfGranted: false } });

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
