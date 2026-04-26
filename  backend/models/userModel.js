// userModel.js
class UserModel {
    static getPreferences() {
        return {
            usage: { currentCredits: 0, maxCredits: 400 },
            allowAiTraining: true,
            emailPreferences: false
        };
    }
}
module.exports = UserModel;
