import React from 'react';
import { connect } from 'react-redux';

import './TerminalModal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TerminalModal extends React.Component {

    constructor(props) {
        super(props);
    }

    render = () => {
        if (!this.props.id) {
            return null;
        }

        let actions = [
            {
                icon: 'sign-out-alt',
                color: 'primary',
                action: 'Sign Out',
                command: 'signout',
                valid: () => this.props.status == "LOGGED_IN",
            },
            {
                icon: 'undo',
                color: 'danger',
                action: 'Restart',
                command: 'restart',
                valid: () => this.props.status != "OFFLINE",
            },
            {
                icon: 'power-off',
                color: 'danger',
                action: 'Shutdown',
                command: 'shutdown',
                valid: () => this.props.status != "OFFLINE",
            },
        ];

        let actualActions = actions.filter(act => act.valid()).map(act => 
            <button className={`btn btn-${act.color}`}>
                <FontAwesomeIcon icon={act.icon} />
            </button>    
        )

        return <div className="modal show" style={{display: 'block'}}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {this.props.name}
                        </h5>
                        <button type="button" className="close"
                            onClick={this.props.close}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div className="modal-footer">
                        {actualActions}
                    </div>
                </div>
            </div>
        </div>
    }

}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    ...state.terminals.find(terminal => terminal.id === state.terminalModal),
})

const mapDispatchToProps = dispatch => {
    return {
        close: () => dispatch({type: 'CLOSE_MODAL_TERMINAL'}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TerminalModal)