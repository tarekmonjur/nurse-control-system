const Validator = require('./../lib/validator');
const ValidationError = require('./../lib/validationError');
const { Settings } = require('./../models/settings.modal');

const {isEmpty} = require('lodash');

module.exports = {
    defaultColumns: {
        name: 'Name',
        title: 'Title',
        email: 'Email',
        hotline: 'Hotline',
        logo: '',
        address: 'Address',
    },

    getFields() {
        let fields = {};
        Object.keys(this.defaultColumns).filter((key) => {
            fields[key] = '';
        });
        return fields;
    },

    makePayload(data) {
        const payload = Object.assign(this.getFields(),{
            username: '',
            password: '',
            confirm_password: '',
        }, data);
        return payload;
    },

    handleValidate(data) {
        const rules = {
            name: 'require|min:3|max:50',
            group: 'require',
            department: 'max:50',
            designation: 'max:50',
            email: 'email|max:100',
            mobile_no: 'require|mobile:bn-BD',
            address: 'max:255',
            username: 'min:3|max:20',
            password: 'min:6|max:20',
            confirm_password: 'equal:password',
        };

        const payload = this.makePayload(data);
        const validate = new Validator(payload, rules);
        return validate.getErrors();
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
        const actions = req.user ? req.user.actions || [] : [];
        let select = req.query.columns || '';
        let columns = this.defaultColumns;

        if (select) {
            columns = this.getColumns(select);
            select = select.replace(',', ' ');
        }

        const column = Object.keys(columns).join(',');
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

    async getSettings() {
        return Settings.findOne();
    },

    // async upsertUser(payload, isNew = true) {
    //     const user = new User(payload);
    //     const error = user.validateSync();
    //     if (error && error.errors) {
    //         throw new ValidationError('User fields error', error.errors);
    //     }
    //     user.isNew = isNew;
    //     return await user.save();
    // },



};