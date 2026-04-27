const express = require('express');
const router = express.Router();

const { execSync } = require('child_process');

router.get('/stats', (req, res) => {
    let currentBranch = 'main';
    try {
        currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    } catch (e) {
        console.error("Failed to get git branch", e);
    }

    res.json({
        activeProjects: 12,
        pendingApprovals: 4,
        totalCredits: 400,
        usedCredits: 124,
        currentBranch,
        recentActivity: [
            { id: 1, type: 'remix', name: 'UI Dashboard - 4 Column...', time: '2h ago' },
            { id: 2, type: 'update', name: 'User Settings - Profile...', time: '5h ago' }
        ]
    });
});

module.exports = router;
