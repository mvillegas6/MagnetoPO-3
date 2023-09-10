const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://MG_USER_TEST_INNOV:2NeRJbQs*J@aOoIwlK$IBLSGH!9mMEMtqJ2rlP4pPBL4^w@mg-innovation2.postgres.database.azure.com/innovation')


module.exports.dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
} 


