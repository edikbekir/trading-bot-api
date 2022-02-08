const express = require('express');

const getTwoFactors = require('../controllers/twoFactors/getTwoFactors');
const getTwoFactorById = require('../controllers/twoFactors/getTwoFactorById');
const createTwoFactor = require('../controllers/twoFactors/createTwoFactor');

const router = express.Router();

router.get('/', getTwoFactors);
router.get('/:id', getTwoFactorById);
router.post('/', createTwoFactor);

module.exports = router;