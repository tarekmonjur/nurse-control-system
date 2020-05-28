const mongoose = require('mongoose');
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
    bed_no: {
        type: String,
        minlength: 3,
        default: '',
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
    address: {
        type: String,
        maxlength: 255,
        default: '',
    }
},{
    timestamps: true,
});

// patientSchema.path('gender').options.enum;

const Patient = mongoose.model('patients', patientSchema);

module.exports = Patient;