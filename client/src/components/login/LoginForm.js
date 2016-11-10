import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap'
import ValidatedFormControl from '../common/ValidatedFormControl'

const LoginForm = ({user, onLoginClick, errors, onChange}) => {
  return (
    <form>
      <FormGroup>
        <ControlLabel className="required">Email</ControlLabel>
        <ValidatedFormControl name="email" type="email" placeholder="Email" onChange={onChange} value={user.email} error={errors.email}/>
      </FormGroup>
      <FormGroup>
        <ControlLabel className="required">Mot de passe</ControlLabel>
        <ValidatedFormControl name="password" type="password" placeholder="Mot de passe" onChange={onChange} value={user.password} error={errors.password} />
      </FormGroup>
      <Button bsStyle="primary" onClick={onLoginClick}>Connexion</Button>
    </form>
  )
}

LoginForm.propTypes = {
  user: PropTypes.object.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object
}

export default LoginForm
