import React, { PropTypes } from 'react'
import { Button, Glyphicon } from 'react-bootstrap'
import SortCaret from './SortCaret'
import Const from './Const'

class TableHeader extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      order: ''
    }
    this.handleHeaderClick = this.handleHeaderClick.bind(this)
  }

  handleHeaderClick(event) {
    this.setState({
      order: (this.state.order === Const.SORT_ASC) ? Const.SORT_DESC : Const.SORT_ASC
    })

    this.props.onSort(this.state.order, this.props.field)
    event.preventDefault()
  }

  render() {
    return (
      <th className="clickable" onClick={this.handleHeaderClick} > {this.props.children} < SortCaret order={this.state.order} /></th>)
  }
}

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  field: PropTypes.string.isRequired
}

export default TableHeader
