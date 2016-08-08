import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock, ButtonGroup, Radio } from 'react-bootstrap'
import RadioGroup from '../../common/RadioGroup'

const ProjectForm = ({project, onChange}) => {
  return (
    <form>
      <p>Mon Projet</p>
      <FormGroup>
        <ControlLabel>Nom de mon projet</ControlLabel>
        <FormControl name="name" type="text" placeholder="projet" onChange={onChange} value={project.name}/>
        <HelpBlock>Le nom n'est pas obligatoire.</HelpBlock>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Résumé de mon projet</ControlLabel>
        <FormControl name="summary" rows="5" componentClass="textarea" placeholder="résumé" onChange={onChange} value={project.summary}/>
        <HelpBlock>Non confidentiel, ne doit pas comporter d'élements sensibles.</HelpBlock>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Type de project</ControlLabel>
        <FormControl name="type" componentClass="select" onChange={onChange} value={project.type}>
          <option value="0" disabled>Sélectionner</option>
          <option value="1">Auto-entrepreneuriat ou microactivité</option>
          <option value="2">Création d'entreprise</option>
          <option value="3">Reprise d'entreprise</option>
          <option value="4">Création ou transmission d'une autre forme d'activité (association et autre)</option>
        </FormControl>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Etape du projet</ControlLabel>
        <RadioGroup name="step" onChange={onChange} selectedValue={project.step}>
          <Radio value="building">Construction</Radio>
          <Radio value="launching">Lancement</Radio>
          <Radio value="created">Création, reprise ou transmission réalisée</Radio>
        </RadioGroup>
      </FormGroup>
    </form>
  )
}

ProjectForm.propTypes = {
  project: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default ProjectForm
