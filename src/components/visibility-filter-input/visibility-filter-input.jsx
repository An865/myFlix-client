/* Packages */
import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { setFilter } from '../../actions/actions';

/* Component for Search Bar */
function VisibilityFilterInput(props) {
    return (
        <Form.Control
            onChange={(e) => props.setFilter(e.target.value)}
            value={props.visibilityFilter}
            placeholder="filter"
        />
    );
}

/* While exporting connecting setFilter action with VisibilityFilterInput */
export default connect(null, { setFilter })(VisibilityFilterInput);
