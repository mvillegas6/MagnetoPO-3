const { models } = require('../models/models');

module.exports.main = async (req, res, next) => {
  try {
    const certifications = await models.Certifications.findAll({ limit: 12 });
    console.log(certifications);
    res.render('home', { certifications });
  } catch (error) {
    next(error);
  }
};

// module.exports.homeControllers = {
//   main,
// };
