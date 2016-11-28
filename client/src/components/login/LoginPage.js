import React, { PropTypes } from 'react'
import LoginForm from './LoginForm'
import Validation from '../common/Validation'
import { userValidationConstraints } from './userValidationConstraints'
import toastr from 'toastr'
import { isEmptyObject } from '../common/validationHelper'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../actions/userActions'

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
    const errors = this.userValidation.validateAllFields(this.state.user)
    if (!isEmptyObject(errors)) {
      this.setState({ errors })
      toastr.error('Tu dois renseigner un email et un mot de passe valides')
    }
    else {
      this.props.actions.loginUser(this.state.user)
        .then((user) => {
          toastr.success('Authentification réussie')
          this.context.router.push('/pepite')
        })
        .catch((err) => {
          toastr.error(err)
        })
    }
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

function mapStateToProps(state, ownProps) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch),
  }
}

LoginPage.propTypes = {
  actions: PropTypes.object.isRequired
}
LoginPage.contextTypes = {
  router: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
