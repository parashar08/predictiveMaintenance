// routes/dot.js
const express = require('express');
const router = express.Router();

const startAgent = require('../controllers/agentController.js');
const { receiveData } = require('../controllers/systemDataController.js');
const { predictSystem } = require('../controllers/predictionController.js');

router.route('/start-agent').post(startAgent); // 🧠 Starts agent (runs every 1 min)
router.route('/predict/latest').get(predictSystem); // 📊 Returns prediction
router.route('/systemInfo').post(receiveData); // 📥 Receives system data

module.exports = router;
