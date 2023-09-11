const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

const Certifications = sequelize.define(
    'certifications',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        institution: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        does_not_expire: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        expedition_date: {
            type: DataTypes.DATE,
        },
        expiration_date: {
            type: DataTypes.DATE,
        },
    },
    {
        timestamps: true,
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = Certifications;

module.exports.sequelizeSync = async () => {
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
};
