const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        require: true,
        unique: true,
        default: '',
    },
    password: {
        type: String,
        require: true,
        maxlength: 255,
    },
    mobile_no: {
        type: String,
        unique: true,
        require: true,
        minlength: 11,
        maxlength: 13,
    },
    group_id: {
        type: mongoose.ObjectId,
        ref: 'groups'
    },
    token: {
        type: String,
        maxlength: 255,
        default: ''
    }
}, {
    timestamps: true,
});

userSchema.path('password').set(v => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(v, salt);
});

const User = mongoose.model('users', userSchema);

module.exports = User;
