const ApiKeyModel = require('../models/apiKeyModel');

const getApiKeys = (req, res) => {
    try {
        const keys = ApiKeyModel.getKeys();
        res.status(200).json(keys);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const createApiKey = (req, res) => {
    // Dummy create API key
    res.status(201).json({ message: "API Key created", newKey: `sk-${Math.random().toString(36).substr(2, 9)}` });
};

module.exports = { getApiKeys, createApiKey };
