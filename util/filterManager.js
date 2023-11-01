const { models } = require('../models/models');
const { Op } = require('sequelize');


const manager = async (filtro) => {
    switch (filtro) {
        case '>':
            return await models.Certifications.findAll({
            order:[
              ['price', 'DESC'],
            ],
          }); ;
        case '<':
            return await models.Certifications.findAll({
            order:[
              ['price', 'ASC'],
            ],
          });        case '>10':
            return await models.Certifications.findAll({
            where:{
              duration:{
                [Op.between] : [10,30],
              }
            },
            order:[
              ['duration', 'ASC']
            ],
          });
        case '>30':
            return await models.Certifications.findAll({
            where:{
              duration:{
                [Op.between] : [30,50],
              }
            },
            order:[
              ['duration', 'ASC']
            ],
          });
        case '>50':
            return await models.Certifications.findAll({
            where:{
              duration:{
                [Op.gt] : 50,
              }
            },
            order:[
              ['duration', 'ASC']
            ],
          });
        case 'Tecnologia':
            return await models.Certifications.findAll({
            where:{
              topic: {
                [Op.iLike]: `%${'Tecnologia'}%`,
              },
            }
          });
        case 'Mercadeo':
            return await models.Certifications.findAll({
            where:{
              topic: {
                [Op.iLike]: `%${'Mercadeo'}%`,
              },
            },
          });
        case 'Emprendimiento':
            return await models.Certifications.findAll({
            where:{
              topic: {
                [Op.iLike]: `%${'Emprendimiento'}%`,
              },
            },
          });
        case 'Udemy':
            return await models.Certifications.findAll({
            where:{
              institution: {
                [Op.iLike]: `%${'Udemy'}%`,
              },
            },
          });
        case 'Platzi':
            return await models.Certifications.findAll({
            where:{
              institution: {
                [Op.iLike]: `%${'Platzi'}%`,
              },
            },
          });
        case 'EAFIT':
            return await models.Certifications.findAll({
            where:{
              institution: {
                [Op.iLike]: `%${'EAFIT'}%`,
              },
            },
          });
        default:
            break;
      }
}

module.exports = manager;