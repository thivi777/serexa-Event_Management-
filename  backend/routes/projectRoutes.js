const express = require('express');
const router = express.Router();
const { getAllProjects, remixProject, sendChatMessage } = require('../controllers/projectController');

router.get('/', getAllProjects);
router.post('/remix', remixProject);
router.post('/chat', sendChatMessage);

module.exports = router;
