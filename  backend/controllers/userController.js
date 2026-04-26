const UserModel = require('../models/userModel');

const getUserPreferences = (req, res) => {
    try {
        const prefs = UserModel.getPreferences();
        res.status(200).json(prefs);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const updatePreferences = (req, res) => {
    // Dummy update
    res.status(200).json({ message: "Preferences updated", data: req.body });
};

module.exports = { getUserPreferences, updatePreferences };
