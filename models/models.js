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
      type: DataTypes.DATEONLY,
    },
    expiration_date: {
      type: DataTypes.DATEONLY,
    },
    image: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    createdAt: false,
    updatedAt: false,
  }
);

const Users = sequelize.define(
  'users',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: false,
  }
);

const CertificationUser = sequelize.define(
  'certificationUser',
  {},
  {
    createdAt: true,
    updatedAt: false,
  }
);

const Reviews = sequelize.define(
  'reviews',
  {
    rating: {
      type: DataTypes.ENUM('1', '2', '3', '4', '5'),
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: true,
    updatedAt: true,
  }
);

Users.hasMany(Reviews);
Reviews.belongsTo(Users);
Users.belongsToMany(Certifications, { through: CertificationUser });
Certifications.belongsToMany(Users, { through: CertificationUser });
Reviews.belongsToMany(Certifications, { through: 'certificationReviews' });
Certifications.belongsToMany(Reviews, { through: 'certificationReviews' });

module.exports.models = { Certifications, Users, CertificationUser, Reviews };

module.exports.sequelizeSync = async () => {
  await sequelize.sync({ force: true });
  console.log('All models were synchronized successfully.');
};
