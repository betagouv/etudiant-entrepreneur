import React, {PropTypes} from 'react'
import { FormControl } from 'react-bootstrap'

const ValidatedFormControl = class ValidatedFormControl extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { error, ...rest } = this.props
    return (
      <div className={error ? 'has-error' : ''}>
        <FormControl {...rest}/>
        <div className="help-block">{error}</div>
      </div>
    )
  }
}

ValidatedFormControl.propTypes = {
  error: PropTypes.string
}

export default ValidatedFormControl
