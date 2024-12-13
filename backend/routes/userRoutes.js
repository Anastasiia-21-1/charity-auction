const express = require('express');
const userController = require('../controllers/userController');
const {authMiddleware} = require("../middlewares/auth");
const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.post('/review', authMiddleware, userController.createUserReview);
router.get('/:id', userController.getUserById);

module.exports = router;
