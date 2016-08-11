import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock, ButtonGroup, Radio } from 'react-bootstrap'
import RadioGroup from '../../common/RadioGroup'
import ValidatedFormControl from '../../common/ValidatedFormControl'

const ProjectForm = ({project, onChange, errors}) => {
  return (
    <form>
      <p>Mon Projet</p>
      <FormGroup>
        <ControlLabel>Nom de mon projet</ControlLabel>
        <ValidatedFormControl name="name" type="text" placeholder="projet" onChange={onChange} value={project.name} error={errors.name}/>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Résumé de mon projet</ControlLabel>
        <ValidatedFormControl name="summary" rows="5" componentClass="textarea" placeholder="résumé" onChange={onChange} value={project.summary} error={errors.summary}/>
        <HelpBlock>Non confidentiel, ne doit pas comporter d'élements sensibles.</HelpBlock>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Type de project</ControlLabel>
        <ValidatedFormControl name="type" componentClass="select" onChange={onChange} value={project.type} error={errors.type}>
          <option value="0" disabled>Sélectionner</option>
          <option value="1">Auto-entrepreneuriat ou microactivité</option>
          <option value="2">Création d'entreprise</option>
          <option value="3">Reprise d'entreprise</option>
          <option value="4">Création ou transmission d'une autre forme d'activité (association et autre)</option>
        </ValidatedFormControl>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Etape du projet</ControlLabel>
        <RadioGroup name="step" onChange={onChange} selectedValue={project.step}>
          <Radio value="building">Construction</Radio>
          <Radio value="launching">Lancement</Radio>
          <Radio value="created">Création, reprise ou transmission réalisée</Radio>
        </RadioGroup>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Site internet de mon projet</ControlLabel>
        <ValidatedFormControl name="site" type="url" placeholder="site" onChange={onChange} value={project.site} error={errors.site}/>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Blog de mon projet</ControlLabel>
        <ValidatedFormControl name="blog" type="url" placeholder="blog" onChange={onChange} value={project.blog} error={errors.blog}/>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Compte facebook de mon projet</ControlLabel>
        <ValidatedFormControl name="facebook" type="url" placeholder="facebook" onChange={onChange} value={project.facebook} error={errors.facebook}/>
      </FormGroup>
      <FormGroup>
        <ControlLabel>twitter de mon projet</ControlLabel>
        <ValidatedFormControl name="twitter" type="url" placeholder="twitter" onChange={onChange} value={project.twitter} error={errors.twitter}/>
      </FormGroup>
      <FormGroup>
        <ControlLabel>numéro SIRET</ControlLabel>
        <ValidatedFormControl name="siret" type="text" placeholder="siret" onChange={onChange} value={project.siret} error={errors.siret}/>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Quelle est ou sera mon activité ? Ma proposition de valeur ?</ControlLabel>
        <ValidatedFormControl name="activitySummary" rows="5" componentClass="textarea" placeholder="activité - proposition de valeur" onChange={onChange} value={project.activitySummary} error={errors.activitySummary}/>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Où en suis-je dans mon projet ?</ControlLabel>
        <ValidatedFormControl name="stepSummary" rows="5" componentClass="textarea" placeholder="avanacement" onChange={onChange} value={project.stepSummary} error={errors.stepSummary}/>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Quelles sont les prochaines étapes de mon projet ?</ControlLabel>
        <ValidatedFormControl name="nextStepSummary" rows="5" componentClass="textarea" placeholder="prochaines étapes" onChange={onChange} value={project.nextStepSummary} error={errors.nextStepSummary}/>
      </FormGroup>
    </form>
  )
}

ProjectForm.propTypes = {
  project: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object
}

export default ProjectForm
