const express = require('express');
const router = express.Router();
const { getUserPreferences, updatePreferences } = require('../controllers/userController');

router.get('/preferences', getUserPreferences);
router.post('/preferences', updatePreferences);

module.exports = router;
