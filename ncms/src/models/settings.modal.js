const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
    name: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 255,
        default: ''
    },
    title: {
        type: String,
        minlength: 3,
        maxlength: 255,
        default: '',
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 255,
        default: '',
    },
    hotline: {
        type: String,
        maxlength: 50,
        default: ''
    },
    logo: {
        type: String,
        maxlength: 255,
        default: '',
    },
    address: {
        type: String,
        maxlength: 255,
        default: '',
    },

},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    versionKey: false,
});


settingsSchema.pre('save', function(){
    if (this.isNew) {
        this.set({created_at: new Date()});
        this.set('updated_at', '');
    } else {
        this.set({created_at: this.get('created_at')});
        this.set('updated_at', new Date());
    }
});

const Settings = mongoose.model('settings', settingsSchema);

module.exports.Settings = Settings;
module.exports.settingsSchema = settingsSchema;