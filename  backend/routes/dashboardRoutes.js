const express = require('express');
const router = express.Router();

const { execSync } = require('child_process');

router.get('/stats', (req, res) => {
    let currentBranch = 'main';
    let gitStats = { ahead: 0, behind: 0 };
    
    try {
        currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
        
        // Get ahead/behind counts against 'main'
        // Format: "ahead_count behind_count"
        const counts = execSync('git rev-list --left-right --count main...HEAD').toString().trim().split('\t');
        if (counts.length === 2) {
            gitStats.behind = parseInt(counts[0]);
            gitStats.ahead = parseInt(counts[1]);
        }
    } catch (e) {
        console.error("Failed to get git stats", e);
    }

    res.json({
        activeProjects: 12,
        pendingApprovals: 4,
        totalCredits: 400,
        usedCredits: 124,
        currentBranch,
        gitStats,
        recentActivity: [
            { id: 1, type: 'remix', name: 'UI Dashboard - 4 Column...', time: '2h ago' },
            { id: 2, type: 'update', name: 'User Settings - Profile...', time: '5h ago' }
        ]
    });
});

module.exports = router;
