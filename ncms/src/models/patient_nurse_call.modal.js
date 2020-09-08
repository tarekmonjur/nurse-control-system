const mongoose = require('mongoose');
const moment = require('moment-timezone');
const Schema = mongoose.Schema;
const Nurse = require('./nurse.modal');
const Patient = require('./patient.modal');
const Bed = require('./bed.modal');

const patientNurseCallSchema = new Schema({
    nurse: {
        type: Nurse.nurseSchema,
        default: null
    },
    patient: {
        type: Patient.patientSchema,
        default: null
    },
    bed: {
        type: Bed.bedSchema,
        default: null
    },
    call: {
        type: Date,
        default: '',
        get: getDate
    },
    receive: {
        type: Date,
        default: '',
        get: getDate
    },
    present: {
        type: Date,
        default: '',
        get: getDate
    },
    emergency: {
        type: Date,
        default: '',
        get: getDate
    },
    complete: {
        type: Date,
        default: '',
        get: getDate
    },
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    versionKey: false,
    toJSON: { getters: true },
});

patientNurseCallSchema.virtual('date').get(function () {
    return moment.tz(this.created_at.toISOString(), 'Asia/Dhaka').format('ddd YYYY-MM-DD');
});

function getDate(date) {
    if (date) {
        return moment.tz(date.toISOString(), 'Asia/Dhaka').format('hh:mm:ss a');
    }
}

patientNurseCallSchema.pre('save', function(){
    if (this.isNew) {
        this.set({created_at: new Date()});
        this.set('updated_at', '');
    } else {
        this.set({created_at: this.get('created_at')});
        this.set('updated_at', new Date());
    }
});

const PatientNurseCall = mongoose.model('patient_nurse_call', patientNurseCallSchema);

module.exports = PatientNurseCall;