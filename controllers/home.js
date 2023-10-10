const Certifications = require('../models/models');

const main = async (req, res, next) => {
  try {
    const certifications = await Certifications.findAll({ limit: 9 });
    res.render('home', { certifications });
  } catch (error) {
    next(error);
  }
};

module.exports = homeControllers = {
  main,
};
