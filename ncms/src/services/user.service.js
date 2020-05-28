const Validator = require('./../lib/validator');

module.exports = {
    makePayload(data) {
        const payload = Object.assign({
            name: '',
            email: '',
            mobile_no: '',
            password: '',
            confirm_password: '',
        }, data);
        return payload;
    },

    handleValidate(data) {
        const rules = {
            name: 'require|min:3|max:50',
            email: 'require|email',
            mobile_no: 'mobile:bn-BD',
            password: 'require',
            confirm_password: 'equal:password'
        };
        const payload = this.makePayload(data);
        const validate = new Validator(payload, rules);
        return validate.getErrors();
    }
};