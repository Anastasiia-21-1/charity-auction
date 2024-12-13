const express = require('express');
const auctionController = require('../controllers/auctionController');
const {authMiddleware} = require("../middlewares/auth");
const router = express.Router();

router.get('/', auctionController.getAllAuctions);
router.post('/', authMiddleware, auctionController.createAuction);
router.get('/:id', auctionController.getAuctionById);

module.exports = router;
