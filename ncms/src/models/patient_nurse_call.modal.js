const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientNurseCallSchema = new Schema({
    nurse: {
        type: String,
    },
    patient: {
        type: String,
    },
    bed: {
        type: String,
    },
    call: {
        type: Date,
        default: Date.now
    },
    receive: {
        type: Date,
        default: Date.now
    },
    present: {
        type: Date,
        default: Date.now
    },
    emergency: {
        type: Date,
        default: Date.now
    },
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    versionKey: false,
});

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