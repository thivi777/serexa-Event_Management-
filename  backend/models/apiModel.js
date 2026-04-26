// Dummy Database Models

class UsageModel {
    static getUsage() {
        return {
            dailyCredits: 0,
            maxCredits: 400,
            aiTrainingAllowed: true,
            emailPreferences: false
        };
    }
}

class KeyModel {
    static getKeys() {
        return [
            { id: 1, key: 'sk-...', createdAt: new Date().toISOString(), lastUsed: 'never' }
        ];
    }
}

module.exports = { UsageModel, KeyModel };
