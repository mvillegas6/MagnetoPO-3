const Certifications = require('../models/models');

const main = async (req, res, next) => {
    const certifications = await Certifications.findAll({ limit: 9 });
    // console.log(certifications);
    res.render('home', { certifications });
};

module.exports = homeControllers = {
    main,
};
