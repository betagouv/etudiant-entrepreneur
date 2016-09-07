import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, Radio, HelpBlock } from 'react-bootstrap'
import RadioGroup from '../../common/RadioGroup'
import ValidatedFormControl from '../../common/ValidatedFormControl'

const ProfileForm = ({profile, errors, onChange}) => {
  return (
    <form>
      <p>Mon Profil</p>
      <div>Ici, je fournis bientôt les informations basiques sur mon identité.</div>
    </form>
  )
}

ProfileForm.propTypes = {
  profile: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object
}

export default ProfileForm
