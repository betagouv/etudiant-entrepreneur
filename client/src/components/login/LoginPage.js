import React, { PropTypes } from 'react'
import LoginForm from './LoginForm'
import Validation from '../common/Validation'
import {userValidationConstraints} from './userValidationConstraints'

export class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      user: {
        email: '',
        password: ''
      },
      errors: {},
    }
    this.updateUserState = this.updateUserState.bind(this)
    this.loginUser = this.loginUser.bind(this)
    this.userValidation = new Validation(userValidationConstraints)
  }

  updateUserState(event) {
    const field = event.target.name
    let user = this.state.user
    user[field] = event.target.value
    this.validateUserField(field, event.target.value)
    return this.setState({ user })
  }

  loginUser(event) {
    event.preventDefault()
  }

  validateUserField(field, value) {
    let errors = this.state.errors
    errors[field] = this.userValidation.validateField(field, value)
    if (errors[field] == null) {
      delete errors[field]
    }
    return this.setState({ errors })
  }

  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h1>Connexion à l'espace PEPITE</h1>
        </div>
        <LoginForm
          user={this.state.user}
          onLoginClick={this.loginUser}
          onChange={this.updateUserState}
          errors={this.state.errors} />
      </div>
    )
  }
}

LoginPage.propTypes = {
}

export default LoginPage
