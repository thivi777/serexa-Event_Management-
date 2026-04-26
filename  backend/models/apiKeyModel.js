// apiKeyModel.js
class ApiKeyModel {
    static getKeys() {
        return [
            { id: 1, key: 'sk-...', createdAt: new Date().toISOString(), lastUsed: 'never' }
        ];
    }
}
module.exports = ApiKeyModel;
