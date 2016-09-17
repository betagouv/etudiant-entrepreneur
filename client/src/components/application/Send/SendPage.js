import React, {PropTypes} from 'react'
import SendForm from './SendForm'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import toastr from 'toastr'
import * as applicationActions from '../../../actions/applicationActions'
import * as errorsActions from '../../../actions/errorsActions'

class SendPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.sendForm = this.sendForm.bind(this)
  }

  sendForm() {
    if (this.props.errorsActions.validateApplication()) {
      toastr.success('Envoi')
    } else {
      toastr.error('Tu as des erreurs dans le formulaire')
    }
  }

  render() {
    return (
      <SendForm sendForm={this.sendForm}/>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(applicationActions, dispatch),
    errorsActions: bindActionCreators(errorsActions, dispatch)
  }
}

SendPage.propTypes = {
  actions: PropTypes.object.isRequired,
  errorsActions: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SendPage)

