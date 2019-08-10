import React from 'react';
import { connect } from 'react-redux';

import Terminal from '../Terminal';

import './Terminals.scss';

class Terminals extends React.Component {

    render = () => {
        return <div className="terminals">
            <Terminal name="1" />
            <Terminal name="2" />
            <Terminal name="3" />
            <Terminal name="4" />
            <Terminal name="5" />
            <Terminal name="6" />
            <Terminal name="7" />
            <Terminal name="8" />
            <Terminal name="9" />
            <Terminal name="10" />
        </div>
    }

}

export default connect()(Terminals)