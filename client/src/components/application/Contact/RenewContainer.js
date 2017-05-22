import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import toastr from 'toastr'

import * as contactActions from '../../../actions/contactActions'
import RenewForm from './RenewForm'

export class RenewContainer extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      oldLink: '',
      error: '',
      renewId: ''
    }
    this.onOldLinkChange = this.onOldLinkChange.bind(this)
    this.onCopyApplicationClick = this.onCopyApplicationClick.bind(this)
  }

  onOldLinkChange(event) {
    const oldLink = event.target.value
    this.setState({ oldLink })
    this.validateOldLink(oldLink)
  }

  validateOldLink(oldLink) {
    const regex = /^(.*\/application\/)?([a-f\d]{24})$/i
    const match = regex.exec(oldLink)
    if (match && match[2]) {
      this.setState({ error: '', renewId: match[2]  })
    } else {
      this.setState({ error: 'Ton lien n\'est pas valide', renewId: '' })
    }
  }

  onCopyApplicationClick(event) {
    event.preventDefault()
    this.props.copyApplication(this.state.renewId).then(() => {
      toastr.success('Candidature copiée')
    })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.reason) {
          toastr.error(err.response.data.reason)
        } else {
          toastr.error(err)
        }
      })
  }

  render() {
    return (
      <RenewForm
        onOldLinkChange={this.onOldLinkChange}
        onCopyApplicationClick={this.onCopyApplicationClick}
        oldLink={this.state.oldLink}
        error={this.state.error} />
    )
  }
}

RenewContainer.propTypes = {
  copyApplication: PropTypes.func.isRequired
}

export default RenewContainer
