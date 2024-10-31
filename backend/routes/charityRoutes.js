const express = require('express');
const charityController = require('../controllers/charityController');
const router = express.Router();

router.get('/', charityController.getAllCharities);
router.post('/', charityController.createCharity);
router.get('/:id', charityController.getCharityById);

module.exports = router;
