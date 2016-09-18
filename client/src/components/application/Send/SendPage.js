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
      this.props.actions.saveApplication()
        .then(application => {
          this.props.actions.sendApplication()
            .then(() => {
              toastr.succes('Candidature envoyée')
            })
            .catch((err) => {
              if (err.response && err.response.data && err.response.data.reason) {
                toastr.error(err.response.data.reason)
              } else {
                toastr.error(err)
              }
            })
        })
        .catch((err) => {
          toastr.error(err)
        })
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

