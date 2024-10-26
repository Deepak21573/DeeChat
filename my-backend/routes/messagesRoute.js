const express = require('express');
const router = express.Router();

const { addMessage } = require('../controllers/messageController.js')
const { getMessages } = require('../controllers/messageController.js');

router.post('/addmsg/' , addMessage);
router.post('/getmsg/',getMessages);
module.exports = router;