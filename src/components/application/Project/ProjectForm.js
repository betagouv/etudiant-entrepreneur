import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'

const ProjectForm = ({project, onChange}) => {
  return (
    <form>
      <p>Mon Projet</p>
      <FormGroup>
        <ControlLabel>Nom de mon projet</ControlLabel>
        <FormControl name="name" type="text" placeholder="name" onChange={onChange} value={project.name}/>
        <HelpBlock>Le nom n'est pas obligatoire.</HelpBlock>
      </FormGroup>
    </form>
  )
}

ProjectForm.propTypes = {
  project: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default ProjectForm
