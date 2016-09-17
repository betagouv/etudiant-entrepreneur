import React, {PropTypes} from 'react'
import { FormControl } from 'react-bootstrap'

const ValidatedComponent = class ValidatedComponent extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { error } = this.props
    return (
      <div className={error ? 'has-error' : ''}>
        {this.props.children}
        <div className="help-block">{error}</div>
      </div>
    )
  }
}

ValidatedComponent.propTypes = {
  error: PropTypes.string,
  children: PropTypes.node
}

export default ValidatedComponent
