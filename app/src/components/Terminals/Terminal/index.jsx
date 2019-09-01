import React from 'react'
import { connect } from 'react-redux'

import { status, color, icon, operatingIcon } from '../../../libraries/terminals'
import * as Actions from '../../../actions/terminals'

import './Terminal.scss'

class Terminal extends React.Component {

  selected = () => {
    return (this.props.selected ? 'selected ' : '') +
      (this.props.fade ? 'faded' : '');
  }

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
        style={{ background: color(this.props.status) }}
        onClick={this.handleClick} onDoubleClick={this.handleOpen}>

        <div className="title">
          {this.props.name}
        </div>
        <div className="small">
          {operatingIcon(this.props.operating_system, 'lg')}
          &nbsp;&nbsp;
                    {icon(this.props.status)}
          &nbsp;
                    {status(this.props.status)}
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
    modal: (id) => dispatch(Actions.openModal(id)),
  }
}

export default connect(null, mapDispatchToProps)(Terminal)