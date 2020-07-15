const UserGroup = require('./../models/user_group.model');
const User = require('./../models/user.model');
const Employee = require('./../models/employee.model');
const Doctor = require('./../models/doctor.modal');
/**
 * Make any changes you need to make to the database here
 */
async function up () {
  // Write migration here
    const user_group = await this('user_groups').find({name: 'Admin'}).exec();
    const user = await this('users').create({
        username: 'admin',
        type: 'employees',
        password: '123456'
    });
    await this('employees').create({
        name: 'admin',
        group: user_group[0],
        user: user,
        email: 'admin@gmail.com',
        mobile_no: '01780292737',
        department: '',
        designation: '',
        gender: 'male',
        joining: new Date(),
        address: 'Dhaka-Bangladesh',
    });
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  // Write migration here
}

module.exports = { up, down };
