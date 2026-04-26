const express = require('express');
const router = express.Router();
const { getUsageData, getKeysData } = require('../controllers/apiController');

router.get('/usage', getUsageData);
router.get('/keys', getKeysData);

module.exports = router;
