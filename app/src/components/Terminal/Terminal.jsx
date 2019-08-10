import React from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Terminal.scss';

class Terminal extends React.Component {

    constructor(props) {
        super(props);

        this.state = { unlocked: true }; 
    }

    color = () => {
        switch (this.props.status) {
            case 'ONLINE': return '#399e5a'
            case 'OFFLINE': return '#b3001b'
            default: return '#f2af29'
        }
    }

    icon = () => {
        switch (this.props.status) {
            case 'ONLINE': return 'lock-open'
            case 'OFFLINE': return 'lock'
            default: return '#f2af29'
        }
    }

    render = () => {
        return <button className="terminal" onClick={this.toggle}>
            <div className="icons">
                <FontAwesomeIcon icon={['fad', 'desktop']} size="2x" color={this.color()} />
                <FontAwesomeIcon icon={['fas', this.icon()]} size="lg" color={this.color()} />
            </div>
            <div class="title">{this.props.name}</div>
        </button>
    }

}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    status: "ONLINE"
})  

export default connect(mapStateToProps)(Terminal)