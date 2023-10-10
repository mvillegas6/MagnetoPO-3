const Certifications = require('../models/models');
const { Op } = require('sequelize');

const show = async (req, res, next) => {
  let certifications;
  let keyword = '';
  try {
    // Search by name
    if (req.query.q) {
      keyword = req.query.q;
      certifications = await Certifications.findAll({
        where: {
          name: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
      });
    } else {
      certifications = await Certifications.findAll();
    }
    res.render('certifications/show', { certifications, keyword });
  } catch (error) {
    next(error);
  }
};

module.exports = certificationsControllers = {
  show,
};
