const { Sequelize } = require('sequelize');
const { Certifications, Users } = require('./models/models');

require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

module.exports.dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
