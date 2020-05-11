import React, {Component} from "react";

class FilterButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pr-3">
                <a className="" data-toggle="collapse" href="#filters" role="button"
                   aria-expanded="false" aria-controls="collapseExample">
                    <img src="../img/filter.png" alt="" />
                    Filters
                </a>
            </div>
        );
    }
}

export default FilterButton;