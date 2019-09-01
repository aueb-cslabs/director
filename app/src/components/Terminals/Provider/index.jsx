import React from 'react';
import { connect } from 'react-redux';

import { updateTerminalsAsync } from '../../../actions/terminals';

class Provider extends React.Component {

    componentDidMount = () => {
        this.props.updateTerminalsAsync()
        this.task = setInterval(this.update, 1000)
    }

    componentWillUnmount = () => {
        clearInterval(this.task)
    }

    update = () => {
        this.props.updateTerminalsAsync()
    }
    
    render = () => null

}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    terminals: state.terminals.all,
})

const mapDispatchToProps = dispatch => {
    return {
        updateTerminalsAsync: () => dispatch(updateTerminalsAsync())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Provider)