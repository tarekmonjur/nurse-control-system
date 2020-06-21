const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nurseSchema = new Schema({
    name: {
        type: String,
        index: true,
        require: true,
        minlength: 3,
        maxlength: 50,
        default: ''
    },
    mobile_no: {
        type: String,
        maxlength: 13,
        default: '',
    },
    department: {
        type: String,
        maxlength: 50,
        default: '',
    },
    designation: {
        type: String,
        maxlength: 50,
        default: '',
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'other'
    },
    assistant: {
        type: String,
        minlength: 3,
        default: '',
    },
    joining: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String,
        maxlength: 255,
        default: '',
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    versionKey: false,
});

nurseSchema.pre('save', function(){
    if (this.isNew) {
        this.set({created_at: new Date()});
        this.set('updated_at', '');
    } else {
        this.set({created_at: this.get('created_at')});
        this.set('updated_at', new Date());
    }
});

const Nurse = mongoose.model('nurses', nurseSchema);

module.exports = Nurse;