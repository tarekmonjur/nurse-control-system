const mongoose = require('mongoose');
const Bed = require('./bed.modal');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    name: {
        type: String,
        index: true,
        require: true,
        minlength: 3,
        maxlength: 50,
        default: ''
    },
    bed: {
        type: Bed.bedSchema,
        default: null,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'other'
    },
    patient_mobile_no: {
        type: String,
        maxlength: 13,
        default: '',
    },
    guardian_name: {
        type: String,
        maxlength: 50,
        default: '',
    },
    guardian_mobile_no: {
        type: String,
        maxlength: 13,
        default: '',
    },
    admitted_date: {
        type: Date,
        default: Date.now
    },
    release_date: {
        type: Date,
        default: null
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

// patientSchema.path('createdAt').options.enum;

// schema.set(timestamps, {
//     createdAt: true,
//     updatedAt: { path: 'updatedAt', setOnInsert: false }
// });

patientSchema.pre('save', function(){
    if (this.isNew) {
        this.set({created_at: new Date()});
        this.set('updated_at', '');
    } else {
        this.set({created_at: this.get('created_at')});
        this.set('updated_at', new Date());
    }
});

const Patient = mongoose.model('patients', patientSchema);

module.exports.Patient = Patient;
module.exports.patientSchema = patientSchema;