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
    topic:{
      type:DataTypes.STRING,
      allowNull: true,
    },
    employability: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    coursepage:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    duration:{
      type:DataTypes.INTEGER,
      allowNull: true,
    },
    price:{
      type: DataTypes.INTEGER,
      allowNull: true,
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
    mycertifications: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    employeestatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
  {
    timestamps: true,
    createdAt: false,
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
      type: DataTypes.ENUM('0', '1', '2', '3', '4', '5'),
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

const CertificationReviews = sequelize.define('certificationReviews', {});

Users.hasMany(Reviews);
Reviews.belongsTo(Users);
Users.belongsToMany(Certifications, { through: CertificationUser });
Certifications.belongsToMany(Users, { through: CertificationUser });
Reviews.belongsToMany(Certifications, { through: CertificationReviews });
Certifications.belongsToMany(Reviews, { through: CertificationReviews });
Reviews.hasMany(CertificationReviews);
CertificationReviews.belongsTo(Reviews);
Certifications.hasMany(CertificationReviews);
CertificationReviews.belongsTo(Certifications);

module.exports.models = {
  Certifications,
  Users,
  CertificationUser,
  Reviews,
  CertificationReviews,
};

module.exports.sequelizeSync = async () => {
  await sequelize.sync({ alter: true });
  console.log('All models were synchronized successfully.');
};

async function calculateEmployability() {
  try {
    const users = await Users.findAll();
    const dictionary = {};
    const dictionary2 = {};

    users.forEach((user) => {
      const a = user.mycertifications;

      a.forEach((item) => {
        if (dictionary.hasOwnProperty(item)) {
          dictionary[item] += 1;
          if (user.employeestatus === true) {
            if (dictionary2.hasOwnProperty(item)) {
              dictionary2[item] += 1;
            } else {
              dictionary2[item] = 1;
            }
          }
        } else {
          dictionary[item] = 1;
          if (user.employeestatus === true) {
            if (dictionary2.hasOwnProperty(item)) {
              dictionary2[item] += 1;
            } else {
              dictionary2[item] = 1;
            }
          }
        }
      });
    });

    const length = Object.keys(dictionary).length;

    for (let i = 1; i <= length; i++) {
      const certificationId = i; // Replace this with the actual certification ID
      if (dictionary2.hasOwnProperty(i)){
        await Certifications.update({ employability: (dictionary2[i] / dictionary[i]) * 100 }, {
          where: { id: certificationId }
        });
      } else {
        await Certifications.update({ employability: 0 }, {
          where: { id: certificationId }
        });
      }
    }

  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

(async () => {
  const employabilityPercentage = await calculateEmployability();
  console.log(employabilityPercentage);
})();