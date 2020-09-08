const mqtt = require('mqtt');
const patientNurseCallService = require('./../services/patient_nurse_call.service');

const PATIENT_DEVICE_TOPIC = '$share/broker/device/+/status/+/patient';
const PATIENT_UI_UPDATE_TOPIC = 'broker/ui/patient';
// const PATIENT_MOBILE_TOPIC = '$share/broker/mobile/+/nurse/+/patient';
const PATIENT_MOBILE_TOPIC = 'broker/mobile/patient/call/receive';

module.exports.patientNurseCallHandle = async (io) => {
    try {
        const patientIO = io.of('/patient');

        patientIO.on('connection', (client) => {
            console.log('patient connected');
            client.on(PATIENT_MOBILE_TOPIC, async (data) => {
                console.log({data});
                const {call_id, nurse_id, message} = JSON.parse(data);
                const result = await patientNurseCallService.patientMobileCallHandle(call_id, nurse_id, message);
                console.log({result});
                if (result) {
                    patientIO.emit(PATIENT_UI_UPDATE_TOPIC, JSON.stringify(result));
                }
            });
        });

        const client = mqtt.connect(`mqtt://${process.env.MQTT_HOST}`, {
            username: 'tarek',
            password: 'tarek21',
            clientId: 'broker1',
        });

        client.on('connect', () => {
            console.log('MQTT Connect');
            // subscription for getting device data
            client.subscribe(PATIENT_DEVICE_TOPIC, {qos: 1},(err) => {
               if (err) {
                   console.log('Unable to MQTT Subscription topic: ', PATIENT_DEVICE_TOPIC, err);
               } else {
                   console.log('MQTT Subscribe topic: ', PATIENT_DEVICE_TOPIC);
               }
            });

            // subscription for getting mobile app data
            client.subscribe(PATIENT_MOBILE_TOPIC, {qos: 1}, (err) => {
                if (err) {
                    console.log('Unable to MQTT Subscription topic: ', PATIENT_MOBILE_TOPIC, err);
                } else {
                    console.log('MQTT Subscribe topic: ', PATIENT_MOBILE_TOPIC);
                }
            });
        });

        client.on('message', async (topic, message) => {
            message = message.toString();
            const topic_segment = topic.split('/');
            console.log(topic_segment);
            console.log(message);
            const topic_first_segment = topic_segment[0];
            const topic_last_segment = topic_segment[topic_segment.length - 1];

            if (topic_first_segment === 'device' && topic_last_segment === 'patient') {
                const device_no = topic_segment[1];
                const status = topic_segment[3];
                const result = await patientNurseCallService.patientDeviceCallHandle(device_no, status, message);
                console.log({result});
                if (result) {
                    patientIO.emit(PATIENT_UI_UPDATE_TOPIC, JSON.stringify(result));
                }
            }
            else if (topic_first_segment === 'mobile' && topic_last_segment === 'patient') {
                const call_id = topic_segment[1];
                const nurse_id = topic_segment[3];
                const result = await patientNurseCallService.patientMobileCallHandle(call_id, nurse_id, message);
                console.log({result});
                if (result) {
                    patientIO.emit(PATIENT_UI_UPDATE_TOPIC, JSON.stringify(result));
                }
            }
        });
    } catch (err) {
        console.log('MQTT CLIENT: ', err);
    }

};