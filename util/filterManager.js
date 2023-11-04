const { models } = require('../models/models');
const { Op } = require('sequelize');

const manager = async (filtro) => {
  switch (filtro) {
    case '>':
      return await models.Certifications.findAll({
        order: [['price', 'DESC']],
      });
    case '<':
      return await models.Certifications.findAll({
        order: [['price', 'ASC']],
      });
    case '>10':
      return await models.Certifications.findAll({
        where: {
          duration: {
            [Op.between]: [10, 30],
          },
        },
        order: [['duration', 'ASC']],
      });
    case '>30':
      return await models.Certifications.findAll({
        where: {
          duration: {
            [Op.between]: [30, 50],
          },
        },
        order: [['duration', 'ASC']],
      });
    case '>50':
      return await models.Certifications.findAll({
        where: {
          duration: {
            [Op.gt]: 50,
          },
        },
        order: [['duration', 'ASC']],
      });
    case 'Tecnologia':
      return await models.Certifications.findAll({
        where: {
          topic: {
            [Op.iLike]: `%${'Tecnologia'}%`,
          },
        },
      });
    case 'Mercadeo':
      return await models.Certifications.findAll({
        where: {
          topic: {
            [Op.iLike]: `%${'Mercadeo'}%`,
          },
        },
      });
    case 'Emprendimiento':
      return await models.Certifications.findAll({
        where: {
          topic: {
            [Op.iLike]: `%${'Emprendimiento'}%`,
          },
        },
      });
    case 'Udemy':
      return await models.Certifications.findAll({
        where: {
          institution: {
            [Op.iLike]: `%${'Udemy'}%`,
          },
        },
      });
    case 'Platzi':
      return await models.Certifications.findAll({
        where: {
          institution: {
            [Op.iLike]: `%${'Platzi'}%`,
          },
        },
      });
    case 'EAFIT':
      return await models.Certifications.findAll({
        where: {
          institution: {
            [Op.iLike]: `%${'EAFIT'}%`,
          },
        },
      });
    default:
      break;
  }
};

const findCertifications = async (limit = null) => {
  if (limit) {
    return await models.Certifications.findAll({ limit });
  } else {
    return await models.Certifications.findAll();
  }
};

const querySearch = async (q) => {
  if (q) {
    return await models.Certifications.findAll({
      where: {
        name: {
          [Op.iLike]: `%${q}%`,
        },
      },
    });
  } else {
    return await models.Certifications.findAll();
  }
};

const findCertificationByPk = async (pk) => {
  return await models.Certifications.findByPk(pk);
};

const filterReviews = async (certificationId) => {
  return await models.Reviews.findAll({
    include: {
      model: models.CertificationReviews,
      where: {
        certificationId,
      },
    },
  });
};

const addReview = async (body, certification) => {
  const review = await models.Reviews.create({
    rating: body.rating,
    comment: body.body,
    author: 'OmnyUser',
  });
  await certification.addReviews(review, { through: { selfGranted: false } });
};

module.exports = {
  manager,
  querySearch,
  findCertificationByPk,
  filterReviews,
  addReview,
  findCertifications,
};
