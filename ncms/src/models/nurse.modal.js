const mongoose = require('mongoose');
const {doctorSchema} = require('./doctor.modal');
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
    group: {
        type: Schema.Types.ObjectId,
        ref: 'user_groups',
        require: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        default: null
    },
    email: {
        type: String,
        require: true,
        index: true,
        default: '',
    },
    mobile_no: {
        type: String,
        unique: true,
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
    doctors: {
        type: [doctorSchema],
        default: [],
    },
    joining: {
        type: Date,
        default: Date.now,
        get: getJoining
    },
    address: {
        type: String,
        maxlength: 255,
        default: '',
    }
},{
    excludeIndexes: true,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    versionKey: false,
    toJSON: { getters: true },
});

function getJoining(joining) {
    return joining.toISOString()
        .split('T')[0].toString();
}

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

module.exports.Nurse = Nurse;
module.exports.nurseSchema = nurseSchema;