const express = require('express');
const donatesController = require('../controllers/donatesController');
const {authMiddleware} = require("../middlewares/auth");
const router = express.Router();

router.get('/', donatesController.getAllDonates);
router.post('/', authMiddleware, donatesController.createDonate);
router.get('/:id', donatesController.getDonateById);

module.exports = router;
