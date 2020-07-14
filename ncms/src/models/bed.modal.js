const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bedSchema = new Schema({
    bed_no: {
        type: String,
        index: true,
        require: true,
        minlength: 3,
        maxlength: 50,
        default: ''
    },
    device_no: {
        type: String,
        index: true,
        require: true,
        minlength: 3,
        maxlength: 50,
        default: '',
    },
    bed_type: {
        type: String,
        enum: ['Normal', 'AC', 'VIP', 'Cabin'],
        default: 'Normal'
    },
    bed_price: {
        type: Number,
        maxlength: 20,
        default: '',
    },
    bed_location: {
        type: String,
        maxlength: 255,
        default: '',
    },

},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    versionKey: false,
});


bedSchema.pre('save', function(){
    if (this.isNew) {
        this.set({created_at: new Date()});
        this.set('updated_at', '');
    } else {
        this.set({created_at: this.get('created_at')});
        this.set('updated_at', new Date());
    }
});

const Bed = mongoose.model('beds', bedSchema);

module.exports = Bed;