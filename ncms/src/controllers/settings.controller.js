const settingsService = require('./../services/settings.service');

class SettingsController {

    static async index(filter) {
        const settings = await settingsService.getSettings(filter);
        return settings;
    }

    static async update(payload) {
        try {
            const settings = await settingsService.getSettings();
            if (!settings) {
                throw new ValidationError('Settings not found', {}, 404);
            }
            return await settingsService.updateSettings(payload);
        } catch (err) {
            console.log('Data Not Store', {err});
            throw err;
        }
    }


}

module.exports = SettingsController;