const {
  Router
} = require('express');

const profiles = require('./profiles');
const twoFactors = require('./twoFactors');
const sales = require('./sales');

module.exports = app => {
  app.use('/api',
    Router()
    .use('/profiles', profiles)
    .use('/twoFactors', twoFactors)
    .use('/sales', sales)
  );
}