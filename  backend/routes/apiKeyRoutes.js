const express = require('express');
const router = express.Router();
const { getApiKeys, createApiKey } = require('../controllers/apiKeyController');

router.get('/', getApiKeys);
router.post('/create', createApiKey);

module.exports = router;
