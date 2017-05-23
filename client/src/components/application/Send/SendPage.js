import React, { PropTypes } from 'react'
import SendForm from './SendForm'
import SentFrom from './SentForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import toastr from 'toastr'
import * as applicationActions from '../../../actions/applicationActions'
import * as errorsActions from '../../../actions/errorsActions'
import NextCommittee from '../../pepite/Committee/NextCommittee'

class SendPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.sendForm = this.sendForm.bind(this)
    this.editForm = this.editForm.bind(this)
    this.state = {
      isSending: false
    }
  }

  sendForm() {
    if (this.props.errorsActions.validateApplication()) {
      this.setState({ isSending: true })
      this.props.actions.saveApplication()
        .then(application => {
          this.props.actions.sendApplication()
            .then(() => {
              this.setState({ isSending: false })
              toastr.success('Candidature envoyée')
            })
            .catch((err) => {
              this.setState({ isSending: false })
              if (err.response && err.response.data && err.response.data.reason) {
                toastr.error(err.response.data.reason)
              } else {
                toastr.error(err)
              }
            })
        })
        .catch((err) => {
          this.setState({ isSending: false })
          toastr.error(err)
        })
    } else {
      this.setState({ isSending: false })
      toastr.error('Tu as des erreurs dans le formulaire')
    }
  }

  editForm(event) {
    event.preventDefault()
    this.props.actions.saveApplication()
      .then((application) => {
        toastr.success("Candidature modifiée")
      })
      .catch((err) => {
        toastr.error(err)
      })
  }

  render() {
    return (
      <div>
        <NextCommittee />
        {this.props.canBeSent ?
          <SendForm sendForm={this.sendForm} isSending={this.state.isSending} /> :
          <SentFrom editForm={this.editForm} />
        }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    canBeSent: state.application.status === 'saved' || !state.application.status
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
  canBeSent: PropTypes.bool.isRequired,
  errorsActions: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SendPage)

