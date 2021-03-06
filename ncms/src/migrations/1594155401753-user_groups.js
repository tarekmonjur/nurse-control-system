const UserGroup = require('./../models/user_group.model');
/**
 * Make any changes you need to make to the database here
 */

async function up () {

    this('user_groups').insertMany([
        {
            name: 'Admin',
            permissions: [
                'patient',
                'bed',
                'doctor',
                'nurse',
                'call_history',
                'real_time_call',
                'report',
                'administration',
            ]
        },
        {
            name: 'Manager',
            permissions: [
                'patient',
                'bed',
                'doctor',
                'nurse',
                'call_history',
                'real_time_call',
                'report',
            ]
        },
        {
            name: 'Doctor',
            permissions: [
                'patient',
                'call_history',
                'real_time_call',
                'report',
            ]
        },
        {
            name: 'Nurse',
            permissions: [
                'patient',
                'call_history',
                'real_time_call',
                'report',
            ]
        },
    ]);
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
    this('user_groups').deleteMany({});
}

module.exports = { up, down };
