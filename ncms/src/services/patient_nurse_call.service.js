const _ = require('lodash');
const ValidationError = require('./../lib/validationError');
const PatientNurseCall = require('./../models/patient_nurse_call.modal');
const {Bed} = require('./../models/bed.modal');
const {Nurse} = require('./../models/nurse.modal');
const {Patient} = require('./../models/patient.modal');
const mongoose = require('mongoose');
const PATIENT_CALLING_CALL_DELAY = process.env.CALLING_CALL_DELAY || 1;
const PATIENT_PRESENT_CALL_DELAY = process.env.PRESENT_CALL_DELAY || 5;
const PATIENT_RECEIVE_CALL_DELAY = process.env.RECEIVE_CALL_DELAY || 3;
const PATIENT_COMPLETE_CALL_DELAY = process.env.COMPLETE_CALL_DELAY || 3;

module.exports = {
    defaultColumns: {
        ['nurse.name']: 'Nurse Name',
        ['patient.name']: 'Patient Name',
        ['bed.bed_no']: 'Bed Info',
        date: 'Call Date',
        call: 'Calling',
        receive: 'Received',
        present: 'Present',
        emergency: 'Emergency',
        complete: 'Complete',
    },

    makePayload(data) {
        const payload = Object.assign(this.getFields(), data);
        return payload;
    },

    getFields() {
        let columns = {};
        Object.keys(this.defaultColumns).filter((key) => {
            columns[key] = '';
        });
        return columns;
    },

    getColumns(select) {
        let columns = {};
        select = select.split(',');
        Object.keys(this.defaultColumns).filter((key) => {
            if (select.includes(key)) {
                columns[key] = this.defaultColumns[key];
            }
        });
        return columns;
    },

    makeFilter(req) {
        const actions = req.user && req.user.actions || [];
        let select = req.query.columns || '';
        let columns = this.defaultColumns;

        if (select) {
            columns = this.getColumns(select);
            select = select.replace(',', ' ');
        }

        const column = Object.keys(columns).join(',');
        return {
            filter: req.filter || {},
            page: req.params.page || 1,
            limit: req.params.limit || 25,
            select,
            column,
            columns,
            actions
        };
    },

    async getAllCallHistories(filters = {filter: {}}) {
        return await PatientNurseCall.find(filters.filter, filters.select).sort({created_at: -1});
    },

    async getAllRealCall(filters = {filter: {}}) {
        const result = await PatientNurseCall.aggregate()
            .match(filters.filter)
            .group({
                '_id': '$bed.bed_no',
                "id": {"$last": "$_id"}
            })
            .project({_id: 0});

        const ids = result.map(r => r.id);
        return await PatientNurseCall.find({'_id': {$in: ids}})
            .sort({created_at: -1});
    },

    async getBedByDeviceNo(device_no) {
        return await Bed.findOne({device_no});
    },

    async upsertPatientDeviceCall(payload, isNew = false) {
        const model = PatientNurseCall(payload);
        const error = model.validateSync();
        if (error && error.errors) {
            throw new ValidationError('Patient call fields error', error.errors);
        }
        model.isNew = isNew;
        return model.save();
    },

    async getDeviceLastCall(device_no) {
        const todate = new Date();
        // const date = new Date(todate.setHours(todate.getHours() - 2)).toISOString();
        // const filter = { 'bed.device_no': device_no, 'created_at': {$gt: date } };
        const filter = { 'bed.device_no': device_no };
        return await PatientNurseCall.findOne(filter)
            .sort({created_at: -1}).lean().exec();
    },

    async getPatientByBedId(bed_id) {
        return await Patient.findOne({'bed._id': bed_id, release_date: null})
            .sort({created_at: -1});
    },


    async patientDeviceCallStatus(bed, last_call) {
        const payload = {};
        let result = null;

        if (!_.isEmpty(last_call)) {
            const current_time = new Date().getTime();
            if (_.get(last_call, 'complete', null)) {
                const call_time = _.get(last_call, 'complete', null);
                const last_call_tiem = new Date(call_time).setMinutes(new Date(call_time).getMinutes() + PATIENT_COMPLETE_CALL_DELAY);
                if ( current_time < last_call_tiem) {
                    return result;
                }
            }
            else if (_.get(last_call, 'present', null)) {
                const call_time = _.get(last_call, 'complete', null);
                const last_call_tiem = new Date(call_time).setMinutes(new Date(call_time).getMinutes() + PATIENT_PRESENT_CALL_DELAY);
                if ( current_time < last_call_tiem) {
                    return result;
                }
            }
            else if (_.get(last_call, 'receive', null)) {
                const call_time = _.get(last_call, 'receive', null);
                const last_call_tiem = new Date(call_time).setMinutes(new Date(call_time).getMinutes() + PATIENT_RECEIVE_CALL_DELAY);
                if ( current_time < last_call_tiem) {
                    return result;
                }
            } else if (_.get(last_call, 'call', null)) {
                const call_time = _.get(last_call, 'call', null);
                const last_call_tiem = new Date(call_time).setMinutes(new Date(call_time).getMinutes() + PATIENT_CALLING_CALL_DELAY);
                if ( current_time < last_call_tiem) {
                    return result;
                }
            }
        }

        payload.call = new Date();
        payload.bed = bed;
        payload.patient = await this.getPatientByBedId(bed._id);
        const data = await this.upsertPatientDeviceCall(payload, true);
        result = {
            code: 200,
            status: 'success',
            title: 'Patient Calling a Nurse',
            message: `Bed No - ${data.bed.device_no}, Location - ${data.bed.bed_location}`,
            results: data
        };
        return result;
    },

    async patientDevicePresentStatus(last_call) {
        let result = null;

        if (!_.isEmpty(last_call)) {

            if (_.get(last_call, 'present', null)) {
                return result;
            }

            if (_.get(last_call, 'call', null)
                && _.get(last_call, 'receive', null)) {
                last_call.present = new Date();
                const data = await this.upsertPatientDeviceCall(last_call);
                result = {
                    code: 200,
                    status: 'success',
                    title: 'Nurse Present to Patient',
                    message: `Bed No - ${data.bed.device_no}, Location - ${data.bed.bed_location}`,
                    results: data
                };
            }
        }
        return result;
    },

    async patientDeviceEmergencyStatus(last_call) {
        let result = null;

        if (!_.isEmpty(last_call)) {

            if (_.get(last_call, 'emergency', null)) {
                return result;
            }

            if (_.get(last_call, 'present', null)) {
                last_call.emergency = new Date();
                const data = await this.upsertPatientDeviceCall(last_call);
                result = {
                    code: 200,
                    status: 'success',
                    title: 'Nurse Call Emergency Service',
                    message: `Bed No - ${data.bed.device_no}, Location - ${data.bed.bed_location}`,
                    results: data
                };
            }
        }
        return result;
    },

    async patientDeviceCompleteStatus(last_call) {
        let result = null;

        if (!_.isEmpty(last_call)) {

            if (_.get(last_call, 'complete', null)) {
                return result;
            }

            if (_.get(last_call, 'present', null)) {
                last_call.complete = new Date();
                const data = await this.upsertPatientDeviceCall(last_call);
                result = {
                    code: 200,
                    status: 'success',
                    title: 'Nurse Complete the Service',
                    message: `Bed No - ${data.bed.device_no}, Location - ${data.bed.bed_location}`,
                    results: data
                };
            }
        }
        return result;
    },

    async patientDeviceCallHandle(device_no, status, message = null) {
        try {
            const bed = await this.getBedByDeviceNo(device_no);
            const last_call = await this.getDeviceLastCall(device_no); //today last call
            // console.debug({bed});
            console.debug({last_call});

            if (_.isEmpty(bed)) {
                return null;
            }

            if (status === 'call') {
                return await this.patientDeviceCallStatus(bed, last_call);
            }
            else if (status === 'present') {
                return await this.patientDevicePresentStatus(last_call);
            }
            else if (status === 'emergency') {
                return await this.patientDeviceEmergencyStatus(last_call);
            }
            else if (status === 'complete') {
                return await this.patientDeviceCompleteStatus(last_call);
            }

            return null;
        } catch (err) {
            console.log('error: ', err.message);
            return null;
        }
    },

    async getCallById(id) {
        return await PatientNurseCall.findById(id);
    },

    async getNurseById(id) {
        return await Nurse.findById(id);
    },

    async patientMobileCallHandle(call_id, nurse_id, message = null) {
        try {
            const nurse = await this.getNurseById(nurse_id);
            const call = await this.getCallById(call_id);

            if (_.isEmpty(call) || _.isEmpty(nurse)) {
                return null;
            }
            const payload = call.toObject();
            payload.receive = new Date();
            payload.nurse = nurse;

            const data = await this.upsertPatientDeviceCall(payload);
            const result = {
                code: 200,
                status: 'success',
                title: 'Nurse Received Patient Call',
                message: `Bed No - ${data.bed.device_no}, Location - ${data.bed.bed_location}`,
                results: data
            };
            return result;
        } catch (err) {
            console.log('error: ', err.message);
            return null;
        }
    }


};