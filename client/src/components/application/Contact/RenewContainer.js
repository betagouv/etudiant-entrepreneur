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
      renewId: '',
      isVisible: false,
      hasBeenSkipped: false
    }
    this.onOldLinkChange = this.onOldLinkChange.bind(this)
    this.onCopyApplicationClick = this.onCopyApplicationClick.bind(this)
    this.toggleVisibility = this.toggleVisibility.bind(this)
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
      this.setState({ error: '', renewId: match[2] })
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

  toggleVisibility(event) {
    event.preventDefault()
    if (this.state.isVisible) {
      this.setState({ hasBeenSkipped: true })
    }
    this.setState({ isVisible: !this.state.isVisible })
  }

  render() {
    return (
      <RenewForm
        isVisible={this.state.isVisible}
        hasBeenSkipped={this.state.hasBeenSkipped}
        onOldLinkChange={this.onOldLinkChange}
        onCopyApplicationClick={this.onCopyApplicationClick}
        toggleVisibility={this.toggleVisibility}
        oldLink={this.state.oldLink}
        error={this.state.error} />
    )
  }
}

RenewContainer.propTypes = {
  copyApplication: PropTypes.func.isRequired
}

export default RenewContainer
