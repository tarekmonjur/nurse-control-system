
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true,
        minlength: 3,
        maxlength: 20,
    },
    type: {
        type: String,
        enum: ['doctors', 'nurses', 'employees'],
    },
    password: {
        type: String,
        require: true,
        maxlength: 255,
    },
    token: {
        type: String,
        maxlength: 255,
        index: true,
        default: ''
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    versionKey: false,
});

userSchema.path('password').set(v => {
    const bcrypt = require('bcrypt');
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(v, salt);
});

userSchema.pre('save', function(){
    if (this.isNew) {
        this.set({created_at: new Date()});
        this.set('updated_at', '');
    } else {
        this.set({created_at: this.get('created_at')});
        this.set('updated_at', new Date());
    }
});

const User = mongoose.model('users', userSchema);

module.exports = User;
