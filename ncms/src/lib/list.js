
class List {
    constructor(filter, results){
        this.filter = filter;
        this.columns = filter.columns;
        this.results = results;
        this.metadata = {};
        this.actions = filter.actions;
        this.data = {};
        return this;
    }

    metaData() {
        this.metadata = {
            total: 1,
            page: 1,
            limit: this.filter.limit,
            columns: this.filter.column,
        };
        return this;
    }

    generate() {
        this.metaData();
        this.data = {
            metadata: this.metadata,
            actions: this.actions,
            columns: this.filter.columns,
            results: this.results
        };
        return this.data;
    }
}

module.exports = List;