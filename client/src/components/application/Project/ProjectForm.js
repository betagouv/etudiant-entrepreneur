import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock, ButtonGroup, Radio, Panel } from 'react-bootstrap'
import RadioGroup from '../../common/RadioGroup'
import ValidatedFormControl from '../../common/ValidatedFormControl'
import {isOtherSectorRequired} from './ProjectValidationConstraints'

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
        <ValidatedFormControl name="summary" rows="5" componentClass="textarea" placeholder="Non confidentiel, ne doit pas comporter d'élements sensibles" onChange={onChange} value={project.summary} error={errors.summary}/>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Type de projet</ControlLabel>
        <RadioGroup name="type" onChange={onChange} selectedValue={project.type}>
          <Radio value="creation">Création d'activité</Radio>
          <Radio value="retake">Reprise d'activité</Radio>
          <Radio value="transfer">Transmission d'entreprie familiale</Radio>
        </RadioGroup>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Statut de l'activité</ControlLabel>
        <RadioGroup name="status" onChange={onChange} selectedValue={project.status}>
          <Radio value="micro">Microactivité, auto-entrepreneuriat</Radio>
          <Radio value="company">Société (SAS, SARL...)</Radio>
          <Radio value="asso">Association</Radio>
          <Radio value="coop">Coopérative, SCOP, SCIC...</Radio>
        </RadioGroup>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Etape du projet</ControlLabel>
        <RadioGroup name="step" onChange={onChange} selectedValue={project.step}>
          <Radio value="building">Construction</Radio>
          <Radio value="launching">Lancement</Radio>
          <Radio value="created">Création, reprise ou transmission réalisée</Radio>
        </RadioGroup>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Où en suis-je dans mon projet ?</ControlLabel>
        <ValidatedFormControl name="stepSummary" rows="5" componentClass="textarea" placeholder="avancement" onChange={onChange} value={project.stepSummary} error={errors.stepSummary}/>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Quelles sont les prochaines étapes de mon projet ?</ControlLabel>
        <ValidatedFormControl name="nextStepSummary" rows="5" componentClass="textarea" placeholder="prochaines étapes" onChange={onChange} value={project.nextStepSummary} error={errors.nextStepSummary}/>
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
        <ControlLabel>Quelle est ou sera mon secteur d'activité ?</ControlLabel>
        <ValidatedFormControl name="sector" componentClass="select" onChange={onChange} value={project.sector} error={errors.sector}>
          <option value="0" disabled>Sélectionner</option>
          <option value="1">agriculture/écologie/envrionnement/biotechnologie/énergie renouvelable</option>
          <option value="2">alimentaire</option>
          <option value="3">animalerie</option>
          <option value="4">art/culture/audiovisuel/musique/photographie</option>
          <option value="5">automobile</option>
          <option value="6">bâtiment/construction/design</option>
          <option value="7">communication/évènement/publicité/information/marketing</option>
          <option value="8">électronique</option>
          <option value="9">études/conseil/recrutement</option>
          <option value="10">finance</option>
          <option value="11">immmobilier</option>
          <option value="12">informatique</option>
          <option value="13">jeu vidéo/jeux</option>
          <option value="14">mode</option>
          <option value="15">nouvelles technologies</option>
          <option value="16">santé/bien-être/médical</option>
          <option value="17">sécurité/justice</option>
          <option value="18">sport/loisirs</option>
          <option value="19">tourisme/restauration/hôtellerie</option>
          <option value="20">traduction</option>
          <option value="21">transport/logistique</option>
          <option value="22">vente</option>
          <option value="99">autre</option>
        </ValidatedFormControl>
      </FormGroup>
      <FormGroup className={(isOtherSectorRequired(project.sector)) ? 'required' : 'required hidden'}>
        <ControlLabel>Autre secteur</ControlLabel>
        <ValidatedFormControl name="otherSector" type="text" placeholder="autre secteur" onChange={onChange} value={project.otherSector} error={errors.otherSector}/>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Quelle ma motivation pour lancer cette activité ?</ControlLabel>
        <ValidatedFormControl name="motiviation" rows="5" componentClass="textarea" placeholder="motivation" onChange={onChange} value={project.motiviation} error={errors.motiviation}/>
      </FormGroup>
      <Panel header="Réseaux sociaux">
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
      </Panel>
    </form>
  )
}

ProjectForm.propTypes = {
  project: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object
}

export default ProjectForm
