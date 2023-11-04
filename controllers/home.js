const { models } = require('../models/models');
const { findCertifications } = require('../util/filterManager');

module.exports.main = async (req, res, next) => {
  try {
    const certifications = await findCertifications(9);
    res.render('home', { certifications });
  } catch (error) {
    next(error);
  }
};
