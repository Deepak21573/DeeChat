const express = require('express');
const router = express.Router();

const { signup } = require('../controllers/userController.js')
const { login } = require('../controllers/userController.js')
const { setAvatar } = require('../controllers/userController.js')
const { getAllUsers } = require('../controllers/userController.js')
router.post('/signup' , signup);
router.post('/login' , login);
router.post('/setAvatar/:id' , setAvatar);
router.get('/allusers/:id' , getAllUsers);
module.exports = router;  