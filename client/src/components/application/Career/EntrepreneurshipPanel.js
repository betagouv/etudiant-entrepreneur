import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'
import EntrepreneurshipList from './EntrepreneurshipList'
import EntrepreneurshipAddForm from './EntrepreneurshipAddForm'
import { entrepreneurshipValidationConstraints } from './EntrepreneurshipValidationConstraints'
import ButtonWrapperComponent from '../../common/ButtonWrapperComponent'
import Validation from '../../common/Validation'
import { isEmptyObject } from '../../common/validationHelper.js'

class EntrepreneurshipPanel extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      entrepreneurship: [...props.entrepreneurship],
      newEntrepreneurship: {
        name: '',
        year: '',
        desc: ''
      },
      errors: {}
    }
    this.onEntrepreneurshipDelete = this.onEntrepreneurshipDelete.bind(this)
    this.onEntrepreneurshipAdded = this.onEntrepreneurshipAdded.bind(this)
    this.updateNewEntrepreneurshipState = this.updateNewEntrepreneurshipState.bind(this)
    this.newEntrepreneurshipValidation = new Validation(entrepreneurshipValidationConstraints)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.entrepreneurship) {
      this.setState({ entrepreneurship: [...nextProps.entrepreneurship] })
    }
  }

  onEntrepreneurshipDelete(deletedEntrepreneurship) {
    const entrepreneurship = [...this.state.entrepreneurship.filter((e) => e != deletedEntrepreneurship)]
    this.props.onEntrepreneurshipChange(entrepreneurship)

    return this.setState({
      entrepreneurship
    })
  }

  validateNewEntrepreneurship() {
    const errors = this.newEntrepreneurshipValidation.validateAllFields(this.state.newEntrepreneurship)
    this.setState({ errors })
    return (isEmptyObject(errors))
  }

  onEntrepreneurshipAdded(event) {
    event.preventDefault()

    if (!this.validateNewEntrepreneurship()) {
      return
    }

    const entrepreneurship = [...this.state.entrepreneurship, this.state.newEntrepreneurship]

    this.props.onEntrepreneurshipChange(entrepreneurship)

    return this.setState({
      newEntrepreneurship: {
        name: '',
        year: '',
        desc: ''
      },
      errors: {},
      entrepreneurship
    })
  }

  updateNewEntrepreneurshipState(event) {
    const field = event.target.name
    let newEntrepreneurship = this.state.newEntrepreneurship
    newEntrepreneurship[field] = event.target.value
    return this.setState({ newEntrepreneurship })
  }

  render() {
    return (
      <Panel bsStyle="info" header="Mes expériences entrepreneuriales">
        <EntrepreneurshipList entrepreneurship={this.state.entrepreneurship} onEntrepreneurshipDelete={this.onEntrepreneurshipDelete} />
        <ButtonWrapperComponent showButtonText="J'ajoute mes expériences en entrepreunariat" isChildrenShown={this.state.entrepreneurship.length != 0} glyph="plus">
          <EntrepreneurshipAddForm
            onChange={this.updateNewEntrepreneurshipState}
            newEntrepreneurship={this.state.newEntrepreneurship}
            onEntrepreneurshipAdded={this.onEntrepreneurshipAdded}
            errors={this.state.errors} />
        </ButtonWrapperComponent>
      </Panel>
    )
  }
}

EntrepreneurshipPanel.propTypes = {
  entrepreneurship: PropTypes.array.isRequired,
  onEntrepreneurshipChange: PropTypes.func.isRequired,
}

export default EntrepreneurshipPanel
