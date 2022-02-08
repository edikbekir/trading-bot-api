const express = require('express');

const getSales = require('../controllers/sales/getSales');
const getSaleById = require('../controllers/sales/getSaleById');
const createSale = require('../controllers/sales/createSale');

const router = express.Router();

router.get('/:id', getSaleById);
router.get('/', getSales);
router.post('/', createSale);

module.exports = router;