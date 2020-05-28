const Validator = require('./../lib/validator');

module.exports = {
    makePayload(data) {
        const payload = Object.assign({
            name: '',
            bed_no: '',
            gender: '',
            patient_mobile_no: '',
            guardian_name: '',
            guardian_mobile_no: '',
            admitted_date:'',
            address: '',
        }, data);
        return payload;
    },

    handleValidate(data) {
        const rules = {
            name: 'require|min:3|max:50',
            bed_no: 'require|min:3|max:10',
            patient_mobile_no: 'mobile:bn-BD',
            guardian_name: 'min:3|max:50',
            guardian_mobile_no: 'mobile:bn-BD',
            address: 'max:255'
        };
        const payload = this.makePayload(data);
        const validate = new Validator(payload, rules);
        return validate.getErrors();
    }
};