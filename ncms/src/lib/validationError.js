
class ValidationError extends Error {
    constructor(message, errors = {}, code = 422) {
        super(message);
        this.code = code;
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
                    messages[key] = `${errors[key].message.replace(/[``]/g, '')}`;
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
        const response =  {
            code: this.code,
            name: this.name,
            status: this.status,
            message: this.message,
            errors: this.errorMessages(),
        };
        if (process.env.NODE_ENV === 'development') {
            response.stacktrace = this.stack;
        }
        return response;
    }

}


module.exports = ValidationError;