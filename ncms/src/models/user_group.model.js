
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userGroupSchema = new Schema({
    group_name: {
        type: String,
    },
    permissions: {
        type: Array,
    }
});

const UserGroup = mongoose.model('user_groups', userGroupSchema);

module.exports = UserGroup;