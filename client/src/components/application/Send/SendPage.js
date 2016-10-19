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
    this.state = {
      isSending: false
    }
  }

  sendForm() {
    if (this.props.errorsActions.validateApplication()) {
      this.setState({isSending: true})
      this.props.actions.saveApplication()
        .then(application => {
          this.props.actions.sendApplication()
            .then(() => {
              this.setState({isSending: false})
              toastr.success('Candidature envoyée')
            })
            .catch((err) => {
              this.setState({isSending: false})
              if (err.response && err.response.data && err.response.data.reason) {
                toastr.error(err.response.data.reason)
              } else {
                toastr.error(err)
              }
            })
        })
        .catch((err) => {
          this.setState({isSending: false})
          toastr.error(err)
        })
    } else {
      this.setState({isSending: false})
      toastr.error('Tu as des erreurs dans le formulaire')
    }
  }

  render() {
    return (
      <SendForm sendForm={this.sendForm} isSending={this.state.isSending}/>
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

