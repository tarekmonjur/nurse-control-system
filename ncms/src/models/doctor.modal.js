
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
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
    nurse: {
        type:  Schema.Types.ObjectId,
        ref: 'nurses',
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
        require: true,
        minlength: 11,
        maxlength: 13,
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
    joining: {
        type: Date,
        get: getJoining,
        default: Date.now
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

doctorSchema.pre('save', function(){
    if (this.isNew) {
        this.set({created_at: new Date()});
        this.set('updated_at', '');
    } else {
        this.set({created_at: this.get('created_at')});
        this.set('updated_at', new Date());
    }
});

const Doctor = mongoose.model('doctors', doctorSchema);

module.exports.Doctor = Doctor;
module.exports.doctorSchema = doctorSchema;