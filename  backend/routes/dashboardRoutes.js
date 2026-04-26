const express = require('express');
const router = express.Router();

router.get('/stats', (req, res) => {
    res.json({
        activeProjects: 12,
        pendingApprovals: 4,
        totalCredits: 400,
        usedCredits: 124,
        recentActivity: [
            { id: 1, type: 'remix', name: 'UI Dashboard - 4 Column...', time: '2h ago' },
            { id: 2, type: 'update', name: 'User Settings - Profile...', time: '5h ago' }
        ]
    });
});

module.exports = router;
