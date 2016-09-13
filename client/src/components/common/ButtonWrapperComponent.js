import React, { PropTypes } from 'react'
import { Button, Glyphicon } from 'react-bootstrap'

class ButtonWrapperComponent extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = { isChildrenShown: props.isChildrenShown }
    this.showComponent = this.showComponent.bind(this)
  }

  showComponent(event) {
    event.preventDefault()
    this.setState({ isChildrenShown: true })
  }

  render() {
    if (this.state.isChildrenShown) {
      return (this.props.children)
    }
    else {
      return (<Button bsStyle="primary" className="show-component" onClick={this.showComponent}><Glyphicon glyph={this.props.glyph}/> {this.props.showButtonText}</Button>)
    }
  }
}

ButtonWrapperComponent.propTypes = {
  children: PropTypes.node.isRequired,
  showButtonText: PropTypes.string.isRequired,
  isChildrenShown: PropTypes.bool.isRequired,
  glyph: PropTypes.string.isRequired
}

export default ButtonWrapperComponent
