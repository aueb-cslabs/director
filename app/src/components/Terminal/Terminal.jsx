import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Terminal.scss';

class Terminal extends React.Component {

    constructor(props) {
        super(props);
    }

    status = () => {
        return '';
    }

    color = () => {
        switch (this.props.status) {
            case 'ONLINE': return '#399e5a'
            case 'LOCKED': return '#b3001b'
            case 'OFFLINE': return '#333333'
            default: return '#f2af29'
        }
    }

    selected = () => {
        return this.props.selected ? 'selected' : '';
    }

    icon = () => {
        switch (this.props.status) {
            case 'ONLINE': return 'check'
            case 'LOCKED': return 'lock'
            default: return 'power-off'
        }
    }

    operatingIcon = () => {
        switch (this.props.operating_system) {
            case 'darwin': return 'apple';
            case 'windows': return 'windows';
            case 'linux': return 'linux';
            default: return '';
        }
    }

    actions = () => [
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
            action: 'Shuwdown',
            command: 'shutdown',
            valid: () => this.props.status != "OFFLINE",
        },
    ];

    handleClick = (event) => {
        if (event.shiftKey)
            this.props.selectColumn(this.props.pos_y);
        else
            this.props.select(this.props.name);
    }

    handleOpen = () => {
        this.props.modal(this.props.id)
    }

    render = () => {
        return <div className={`terminal-wrapper x-${this.props.pos_x} y-${this.props.pos_y}`}>
            <div className={`terminal ${this.selected()}`}
                style={{ background: this.color() }}
                onClick={this.handleClick} onDoubleClick={this.handleOpen}>

                <div className="title">
                    {this.props.name}
                </div>
                <div className="small">
                    <FontAwesomeIcon
                        className="mr-1" size="lg"
                        icon={['fab', this.operatingIcon()]} />
                    <FontAwesomeIcon
                        className="mr-1"
                        icon={this.icon()} />
                    {this.status()}
                </div>
            </div>
        </div>
    }

}

const mapDispatchToProps = dispatch => {
    return {
        select: (name) => dispatch({ type: 'SELECT_TERMINAL', name: name }),
        selectRow: (num) => dispatch({ type: 'SELECT_TERMINAL_ROW', num: num }),
        selectColumn: (num) => dispatch({ type: 'SELECT_TERMINAL_COLUMN', num: num }),
        modal: (id) => dispatch({type: 'OPEN_MODAL_TERMINAL', id: id}),
    }
}

export default connect(null, mapDispatchToProps)(Terminal)