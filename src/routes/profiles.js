const express = require('express');

const getProfiles = require('../controllers/profiles/getProfiles');
const getProfileById = require('../controllers/profiles/getProfileById');
const createProfile = require('../controllers/profiles/createProfile');

const router = express.Router();

router.get('/', getProfiles);
router.get('/:id', getProfileById);
router.post('/', createProfile);

module.exports = router;