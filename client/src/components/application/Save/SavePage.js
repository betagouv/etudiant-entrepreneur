import React, {PropTypes} from 'react'
import SaveForm from './SaveForm'
import Validation from '../../common/Validation'

class SavePage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      link: '',
      errors: {},
    }
    this.updateContactState = this.updateContactState.bind(this)
    this.saveForm = this.saveForm.bind(this)
  }

  updateContactState(event) {
    const field = event.target.name
    let contact = this.state.contact
    contact[field] = event.target.value
    return this.setState({ contact })
  }

  saveForm(event) {
    event.preventDefault()
    if (!this.validateSave()) {
      return
    }
    if (typeof this.props.onSaveSuccess == 'function') {
      this.props.onSaveSuccess()
    }
    return this.setState({
      link: 'https://etudiant-entrepreneur.beta.gouv.fr/application/wbwadsfrazrazlkazfk'
    })
  }

  validateSave() {
    //this.setState({ errors })
    return (true)
  }

  render() {
    return (
      <SaveForm
        link={this.state.link}
        saveForm={this.saveForm}
        onChange={this.updateContactState}
        errors={this.state.errors}/>
    )
  }
}

SavePage.propTypes = {
  onSaveSuccess: PropTypes.func,
}

export default SavePage
