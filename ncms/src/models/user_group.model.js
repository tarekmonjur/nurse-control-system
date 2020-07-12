
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userGroupSchema = new Schema({
    name: {
        type: String,
        maxlength: 50,
        default: '',
    },
    permissions: {
        type: Array,
    },
}, {
    versionKey: false,
});

// userGroupSchema.method('transform', function() {
//    let obj = this.toObject();
//    console.log(obj);
//    obj.id = obj._id;
//    delete obj._id;
//    return obj;
// });

// userGroupSchema.post('find', function() {
//     // this.set({id: doc._id});
//     console.log('_id', this._id);
//     this.id = this._id;
// });

const UserGroup = mongoose.model('user_groups', userGroupSchema);

module.exports = UserGroup;