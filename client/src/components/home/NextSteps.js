import React from 'react'
import './NextSteps.css'

class NextSteps extends React.Component {
  renderStep(text, glyphicon) {
    return (
      <div className="col-md-4">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <div className="step-icon">
              <span className={'glyphicon ' + glyphicon} aria-hidden="true" />
            </div>
            <h2 className="step-text">
              {text}
            </h2>
          </div>
        </div>
      </div>
    )
  }

  renderStepSeparator() {
    return (
      <div className="col-md-1 next-step-arrow">
        <span className="glyphicon glyphicon-chevron-right" aria-hidden="true" />
      </div>
    )
  }

  render() {
    return (
      <section id="next-steps">
        <div className="container">
          <div className="vertical-align next-steps-title">
            <h1>Pour profiter du statut Etudiant·e Entrepreneur·e&#8239;:</h1>
          </div>
          <div className="row text-center steps-row">
            {this.renderStep("Dépose ta candidature", "glyphicon-hand-up")}
            {this.renderStepSeparator()}
            {this.renderStep("Passe en comité d'engagement", "glyphicon-calendar")}
            {this.renderStepSeparator()}
            {this.renderStep("Avance dans ton projet", "glyphicon-education")}
          </div>
        </div>
      </section >
    )
  }
}

export default NextSteps
