import React, { PropTypes } from 'react'
import { Modal } from 'react-bootstrap'
import Moment from 'moment'

import ValidatedComponent from '../../common/ValidatedComponent'
import CommitteeForm from './CommitteeForm'

class CommitteeDetailModal extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      committee: {
      },
      errors: {
      }
    }
    this.onDateInit = this.onDateInit.bind(this)
    this.updateCommitteeDate = this.updateCommitteeDate.bind(this)
    this.onSubmitCommittee = this.onSubmitCommittee.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ committee: Object.assign({}, nextProps.committee) })
  }

  onSubmitCommittee(event) {
    if (this.isValidCommittee(this.state.committee)) {
      this.props.submitCommittee(this.state.committee)
    }
  }

  updateCommitteeDate(event) {
    const date = new Moment.utc(event.target.value, 'DD/MM/YYYY').format()
    const committee = this.state.committee
    committee.date = date
    this.setState({ committee })
    if (event.target.value.length === 10) {
      this.isValidCommittee(committee)
    }
  }

  isValidCommittee(committee) {
    if (!new Moment(committee.date).isValid()) {
      this.setState({ errors: { date: 'La date doit être valide' } })
      return false
    }
    this.setState({ errors: {} })
    return true
  }

  onDateInit(dateField) {
    if (this.state.committee.date) {
      const rawBirthdate = new Moment(this.state.committee.date).format('DDMMYYYY')
      dateField.setRawValue(rawBirthdate)
    }
  }

  render() {
    return (
      <Modal show={this.props.isShown} onHide={this.props.close}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.committee ? 'Editer le comité' : 'Nouveau comité'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CommitteeForm
            committee={this.state.committee}
            errors={this.state.errors}
            onDateChange={this.updateCommitteeDate}
            onDateInit={this.onDateInit} />
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-success" onClick={this.onSubmitCommittee}>
            {this.props.committee ? 'Modifier' : 'Ajouter'}
          </button>
          <button type="button" className="btn btn-danger" onClick={this.props.close}>
            Annuler
          </button>
        </Modal.Footer>
      </Modal>
    )
  }
}

CommitteeDetailModal.propTypes = {
  submitCommittee: PropTypes.func.isRequired,
  isShown: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  committee: PropTypes.object
}

export default CommitteeDetailModal
