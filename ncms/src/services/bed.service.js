const Validator = require('./../lib/validator');
const ValidationError = require('./../lib/validationError');
const { Bed } = require('./../models/bed.modal');

module.exports = {
    defaultColumns: {
        bed_no: 'Bed No',
        device_no: 'Device No',
        bed_type: 'Bed Type',
        bed_price: 'Price',
        bed_location: 'Bed Location',
    },

    makePayload(data) {
        const payload = Object.assign(this.getFields(), data);
        return payload;
    },

    handleValidate(data) {
        const rules = {
            bed_no: 'require|min:3|max:10',
            device_no: 'require|min:3|max:50',
            bed_price: 'decimal',
            bed_location: 'max:255'
        };
        const payload = this.makePayload(data);
        const validate = new Validator(payload, rules);
        return validate.getErrors();
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
        // console.log(req.user);
        const actions = req.user.actions || [];
        let select = req.query.columns || '';
        let columns = this.defaultColumns;

        if (select) {
            columns = this.getColumns(select);
            select = select.replace(',', ' ');
        }
        const column = Object.keys(columns).join(',');
        // select = Object.keys(columns).join(' ');

        return {
            filters: {
            },
            page: req.params.page || 1,
            limit: req.params.limit || 25,
            select,
            column,
            columns,
            actions
        };
    },

    async getAllBeds(filters = {filter: {}}) {
        return await Bed.find(filters.filter, filters.select).sort({created_at: -1});
    },

    async getBedById(id) {
        return await Bed.findById(id);
    },

    async deleteBedById(id) {
        return await Bed.deleteOne({_id: id});
    },

    async upsertBed(payload, isNew = true) {
        const bed = new Bed(payload);
        const error = bed.validateSync();
        if (error && error.errors) {
            throw new ValidationError('Bed fields error', error.errors);
        }
        bed.isNew = isNew;
        return await bed.save();
    },
};