const { UsageModel, KeyModel } = require('../models/apiModel');

const getUsageData = (req, res) => {
    try {
        const data = UsageModel.getUsage();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getKeysData = (req, res) => {
    try {
        const keys = KeyModel.getKeys();
        res.status(200).json(keys);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = {
    getUsageData,
    getKeysData
};
