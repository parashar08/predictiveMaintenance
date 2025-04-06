const express = require('express');
const router = express.Router();
const { receiveData } = require('../controllers/systemDataController');

router.post('/', receiveData);

module.exports = router;
