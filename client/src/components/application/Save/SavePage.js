import React, {PropTypes} from 'react'
import SaveForm from './SaveForm'
import Validation from '../../common/Validation'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import toastr from 'toastr'
import * as applicationActions from '../../../actions/applicationActions'

export class SavePage extends React.Component {
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

  getAppliationUrl(applicationId) {
    return window.location.href.replace(/application(\/)?.*/, `application/${applicationId}`)
  }

  saveForm(event) {
    event.preventDefault()
    this.props.actions.saveApplication()
      .then((application) => {
        this.setState({link: this.getAppliationUrl(application.id)})
        toastr.success("Candidature sauvgardée")
      })
      .catch((err) => {
        toastr.error(err)
      })
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

function mapStateToProps(state, ownProps) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(applicationActions, dispatch),
  }
}

SavePage.propTypes = {
  actions: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SavePage)
