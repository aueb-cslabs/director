import React from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import actions from '../../libraries/actions';
import './TerminalModal.scss';

class TerminalModal extends React.Component {

    constructor(props) {
        super(props);
    }

    render = () => {
        if (!this.props.id) {
            return null;
        }

        let actualActions = actions([this])
            .filter(act => act.valid())
            .map(act => 
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