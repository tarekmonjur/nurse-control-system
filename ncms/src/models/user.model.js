const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    mobile_no: {
        type: String,
        default: '',
    },
}, {
    timestamps: true,
});

userSchema.path('password').set(v => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(v, salt);
});

const User = mongoose.model('users', userSchema);

module.exports = User;
