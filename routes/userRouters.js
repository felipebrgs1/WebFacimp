const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUserFisico);
router.get('/', userController.getUsersFisico);
router.post('/login', userController.loginUser);
module.exports = router;
