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
        logo: 'Logo',
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
        const payload = Object.assign(this.getFields(), data);
        return payload;
    },

    handleValidate(data) {
        const rules = {
            name: 'require|min:3|max:255',
            title: 'require|min:3|max:255',
            email: 'email|max:100',
            address: 'max:255',
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

    async updateSettings(payload) {
        const settings = new Settings(payload);
        const error = settings.validateSync();
        if (error && error.errors) {
            throw new ValidationError('Settings fields error', error.errors);
        }
        settings.isNew = false;
        return await settings.save();
    },



};