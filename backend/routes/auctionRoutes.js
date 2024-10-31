const express = require('express');
const auctionController = require('../controllers/auctionController');
const router = express.Router();

router.get('/', auctionController.getAllAuctions);
router.post('/', auctionController.createAuction);
router.get('/:id', auctionController.getAuctionById);

module.exports = router;
