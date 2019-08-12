import React from 'react';
import { connect } from 'react-redux';

import Terminal from '../Terminal/Terminal';

import './Terminals.scss';

class Terminals extends React.Component {

    constructor(props) {
        super(props)
    }

    render = () => {
        return <div className="terminals-scroller">
            <div className="terminals-wrapper">
                <div className="terminals">
                    {
                        this.props.terminals.map((terminal) =>
                            <Terminal key={terminal.name} {...terminal} />
                        )
                    }
                </div>
            </div>
        </div>
    }

}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    terminals: state.terminals,
})

export default connect(mapStateToProps)(Terminals)