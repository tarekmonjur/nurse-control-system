
class ValidationError extends Error {
    constructor(message, errors = {}) {
        super(message);
        this.code = 422;
        this.name = 'ValidationError';
        this.status = 'error';
        this.message = message;
        this.errors = errors;
        return this.toJSON();
    }

    errorMessages() {
        const errors = this.errors;
        const messages = {};
        for (const key in errors) {
            if (errors.hasOwnProperty(key)){
                if (errors[key].hasOwnProperty('message')) {
                    messages[key] = `${key}${errors[key].message.split('(``)')[1]}`;
                } else if (errors[key].hasOwnProperty('msg')) {
                    messages[errors[key].param] = errors[key].msg;
                } else {
                    messages[key] = errors[key];
                }
            }
        }
        return messages;
    }

    toJSON() {
        return {
            code: this.code,
            name: this.name,
            status: this.status,
            message: this.message,
            errors: this.errorMessages(),
            stacktrace: this.stack,
        }
    }

}


module.exports = ValidationError;