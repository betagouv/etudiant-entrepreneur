import React, { Component, PropTypes } from 'react'

const RadioGroup = class RadioGroup extends React.Component {

  getChildProps(child, name, onChange, selectedValue) {
    const optional = {}
    optional.checked = (child.props.value === selectedValue)
    return {  ...optional, name, onChange, }
  }

  attachPropToChildren(name, onChange, selectedValue) {
    return React.Children.map(this.props.children, (child) => React.cloneElement(child, this.getChildProps(child, name, onChange, selectedValue)))
  }

  render() {
    return (
      <div className={this.props.error ? 'has-error' : ''}>
        {this.attachPropToChildren(this.props.name, this.props.onChange, this.props.selectedValue)}
        <div className="help-block">{this.props.error}</div>
      </div>
      )
  }
}

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  selectedValue: PropTypes.string.isRequired,
  error: PropTypes.string
}

export default RadioGroup
