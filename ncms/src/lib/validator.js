const validator = require('validator');
const ValidationError = require('./validationError');

class Validator {

    constructor(payload, rules = {}) {
        this.payload = payload;
        this.rules = rules;
        this.errors = {};
        this.validate();
        return this;
    }

    isEmpty(field) {
        if (validator.isEmpty(this.payload[field])) {
            this.errors[field] = 'This field is required';
        }
    }

    isLength(field, rule) {
        const new_rule = rule.split(':');
        let condition = {};
        condition[new_rule[0]] = new_rule[1];
        if (!validator.isEmpty(this.payload[field]) &&
            !validator.isLength(this.payload[field], condition)) {
            this.errors[field] = `This field length ${rule}`;
        }
    }

    isMobilePhone(field, rule) {
        const condition = rule.split(',');
        if (!validator.isEmpty(this.payload[field]) &&
            !validator.isMobilePhone(this.payload[field], condition)) {
            this.errors[field] = 'Please enter valid number';
        }
    }

    isEmail(field) {
        if (!validator.isEmpty(this.payload[field]) &&
            !validator.isEmail(this.payload[field])) {
            this.errors[field] = 'Please enter valid email';
        }
    }

    equals(field, same) {
        if (!validator.equals(this.payload[field], this.payload[same])) {
            this.errors[field] = `Please enter the same ${same}`;
        }
    }

    isDecimal(field) {
        if (!validator.isEmpty(this.payload[field]) &&
            !validator.isDecimal(this.payload[field])) {
            this.errors[field] = `Please enter decimal value`;
        }
    }


    getErrors(){
        if (Object.keys(this.errors).length > 0) {
            return new ValidationError('Fill Correct Data', this.errors);
        }
        return null;
    }

    validate() {
        const rules =  this.rules;
        for (const key in rules) {
            const field = key;
            const rule = rules[key].split('|');
            for (const key in rule) {
                if (rule.hasOwnProperty(key)) {
                    const rule_parts = rule[key].split(':');
                    switch (rule_parts[0]) {
                        case 'require':
                            this.isEmpty(field);
                            break;
                        case 'min':
                        case 'max':
                            this.isLength(field, rule[key]);
                            break;
                        case 'mobile':
                            this.isMobilePhone(field, rule_parts[1]);
                            break;
                        case 'email':
                            this.isEmail(field);
                            break;
                        case 'equal':
                            this.equals(field, rule_parts[1]);
                            break;
                        case 'decimal':
                            this.isDecimal(field, rule_parts[1]);
                            break;
                        default:
                            break;
                    }
                }
                if (this.errors[field]) {
                    break;
                }
            }
        }
    }
}

module.exports = Validator;