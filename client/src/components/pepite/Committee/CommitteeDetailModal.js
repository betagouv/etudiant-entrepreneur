import React, { PropTypes } from 'react'
import { Modal } from 'react-bootstrap'
import Moment from 'moment'

import ValidatedComponent from '../../common/ValidatedComponent'
import CommitteeForm from './CommitteeForm'
import Validation from '../../common/Validation'
import { committeeValidationConstraints } from './CommitteeValidation'
import { isEmptyObject } from '../../common/validationHelper'

class CommitteeDetailModal extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      committee: {
        date: null,
        lastApplicationDate: null,
        message: ''
      },
      errors: {
      }
    }
    this.onDateInit = this.onDateInit.bind(this)
    this.onlastApplicationDateInit = this.onlastApplicationDateInit.bind(this)
    this.updateCommitteeDate = this.updateCommitteeDate.bind(this)
    this.updateCommitteeState = this.updateCommitteeState.bind(this)
    this.onSubmitCommittee = this.onSubmitCommittee.bind(this)
    this.committeeValidation = new Validation(committeeValidationConstraints)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.committee) {
      this.setState({ committee: Object.assign({}, nextProps.committee) })
    }
  }

  onSubmitCommittee(event) {
    const errors = this.committeeValidation.validateAllFields(this.state.committee)
    if (isEmptyObject(errors)) {
      this.props.submitCommittee(this.state.committee)
    } else {
      this.setState({ errors })
    }
  }

  updateCommitteeDate(event) {
    const date = new Moment.utc(event.target.value, 'DD/MM/YYYY').format()
    const committee = this.state.committee
    committee[event.target.name] = date
    this.setState({ committee })
    if (event.target.value.length === 10) {
      this.validateCommitteeField(event.target.name, date)
    }
  }

  updateCommitteeState(event) {
    const field = event.target.name
    const committee = this.state.committee
    committee[field] = event.target.value
    this.validateCommitteeField(field, event.target.value)
    return this.setState({ committee })
  }

  validateCommitteeField(field, value) {
    const errors = Object.assign({}, this.state.errors)
    errors[field] = this.committeeValidation.validateField(field, value)
    if (errors[field] == null) {
      delete errors[field]
    }
    return this.setState({ errors })
  }

  onDateInit(dateField) {
    if (this.state.committee.date) {
      const rawBirthdate = new Moment(this.state.committee.date).format('DDMMYYYY')
      dateField.setRawValue(rawBirthdate)
    }
  }

  onlastApplicationDateInit(dateField) {
    if (this.state.committee.lastApplicationDate) {
      const rawBirthdate = new Moment(this.state.committee.lastApplicationDate).format('DDMMYYYY')
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
            onChange={this.updateCommitteeState}
            onDateInit={this.onDateInit}
            onlastApplicationDateInit={this.onlastApplicationDateInit} />
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
