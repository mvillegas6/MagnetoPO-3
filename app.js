const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const ejsMate = require('ejs-mate');
const homeRoutes = require('./routes/home');
const { dbConnection } = require('./database');
const { sequelizeSync } = require('./models/models');
const certificationsRoutes = require('./routes/certifications');

const app = express();

dbConnection();

// sequelizeSync(); // Sync models with database

app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/home', homeRoutes);
app.use('/certifications', certificationsRoutes);

app.listen(3000, () => {
  console.log('Application started on port 3000!');
});
