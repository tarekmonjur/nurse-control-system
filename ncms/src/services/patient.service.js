const Validator = require('./../lib/validator');

module.exports = {
    handleValidate(payload) {
        const rules = {
            name: 'require|min:3|max:50',
            bed_no: 'require|min:3|max:10',
            patient_mobile_no: 'mobile:bn-BD',
            guardian_name: 'min:3|max:50',
            guardian_mobile_no: 'mobile:bn-BD',
            address: 'max:255'
        };
        payload = Object.assign({
            name: '',
            bed_no: '',
            patient_mobile_no: '',
            guardian_name: '',
            guardian_mobile_no: '',
            address: '',
        }, payload);

        const validate = new Validator(payload, rules);
        return validate.getErrors();
    }
};