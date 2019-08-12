import React from 'react';
import { connect } from 'react-redux';

import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import actions from '../../libraries/actions';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    selected: state.terminals.filter(t => t.selected),
    query: state.terminalSearch,
});  

const mapDispatchToProps = dispatch => {
    return {
        search: (event) => dispatch({type: 'SEARCH_TERMINAL', query: event.target.value}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function Terminals(props) {

    let actualActions = actions(props.selected)
        .filter(act => act.valid())
        .map(act =>
            <Nav.Link className={`btn btn-secondary p-1 px-2 ml-1`}>
                <FontAwesomeIcon fixedWidth icon={act.icon} />
            </Nav.Link>
        )

    return [
        <Nav className="mr-auto">
            {actualActions}
        </Nav>,
        <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2"
                         value={props.query} onChange={props.search} />
        </Form>
    ]
});