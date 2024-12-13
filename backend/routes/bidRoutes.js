const express = require('express');
const bidController = require('../controllers/bidController');
const {authMiddleware} = require("../middlewares/auth");
const router = express.Router();

router.get('/', bidController.getAllBids);
router.post('/', bidController.createBid);
router.post('/make', authMiddleware, bidController.makeBid);
router.get('/:id', bidController.getBidById);

module.exports = router;
