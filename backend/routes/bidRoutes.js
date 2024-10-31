const express = require('express');
const bidController = require('../controllers/bidController');
const router = express.Router();

router.get('/', bidController.getAllBids);
router.post('/', bidController.createBid);
router.get('/:id', bidController.getBidById);

module.exports = router;
