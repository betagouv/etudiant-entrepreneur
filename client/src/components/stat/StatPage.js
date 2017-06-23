import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'
import { Doughnut } from 'react-chartjs-2'

import statApi from '../../api/statApi'
import ApplicationSummaryTable from './ApplicationSummaryTable'

class StatPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      applicationSummary: [],
      totalApplicationCount: 0,
      genderData: {
        datasets: [{
          data: [0, 0],
          backgroundColor: [
            'rgba(44,62,80,1)',
            'rgba(52,152,219,1)',
          ],
        }],
        labels: [
          'homme',
          'femme'
        ]
      },
      studentData: {
        datasets: [{
          data: [0, 0],
          backgroundColor: [
            'rgba(44,62,80,1)',
            'rgba(52,152,219,1)',
          ],
        }],
        labels: [
          'diplômé',
          'étudiant'
        ]
      },
      majorData: {
        datasets: [{
          data: [0, 0, 0, 0, 0],
          backgroundColor: [
            'rgba(44,62,80,1)',
            'rgba(52,152,219,1)',
            'rgba(24,188,156,1)',
            'rgba(243,156,18,1)',
            'rgba(231,76,60,1)',
          ],
        }],
        labels: [
          'droit',
          'lettres',
          'sciences',
          'sport',
          'santé'
        ]
      },
      statusData: {
        datasets: [{
          data: [0, 0, 0, 0],
          backgroundColor: [
            'rgba(44,62,80,1)',
            'rgba(52,152,219,1)',
            'rgba(24,188,156,1)',
            'rgba(243,156,18,1)',
          ],
        }],
        labels: [
          'sauvegardée',
          'en attente',
          'acceptée',
          'refusée',
        ]
      }
    }
  }

  componentDidMount() {
    statApi.getApplicationSummary().then(((applicationSummary) => {
      this.setState({ applicationSummary })
    }))
    statApi.getApplicationGenderSummary().then(((applicationGenderSummary) => {
      const { genderData } = this.state
      genderData.datasets[0].data = [applicationGenderSummary.male, applicationGenderSummary.female]
      this.setState({ genderData })
    }))
    statApi.getApplicationStudentSummary().then(((applicationStudentSummary) => {
      const { studentData } = this.state
      studentData.datasets[0].data = [applicationStudentSummary.graduate, applicationStudentSummary.student]
      this.setState({ studentData })
    }))
    statApi.getApplicationDiplomaSummary().then(((majorSummary) => {
      const { majorData } = this.state
      majorData.datasets[0].data = [majorSummary.law, majorSummary.letter, majorSummary.science, majorSummary.sport, majorSummary.health]
      this.setState({ majorData })
    }))
    statApi.getApplicationStatuSummary().then(((statusSummary) => {
      const { statusData } = this.state
      statusData.datasets[0].data = [statusSummary.saved, statusSummary.sent, statusSummary.accepted, statusSummary.refused]
      this.setState({ statusData, totalApplicationCount: statusSummary.total })
    }))
  }

  render() {
    return (
      <div className="container stats-container">
        <div className="page-header">
          <h1>Métriques du service en 2017-2018</h1>
          <div className="row">
            <div className="col-lg-4 text-center">
              <Panel className="number-panel">
                <h3>Nombre de candidatures</h3>
                <hr />
                <h1>{this.state.totalApplicationCount}</h1>
              </Panel>
            </div>
            <div className="col-lg-4 text-center">
              <Panel>
                <h3>État des candidatures</h3>
                <hr />
                <Doughnut data={this.state.statusData} />
              </Panel>
            </div>
            <div className="col-lg-4 text-center">
              <Panel>
                <h3>Candidats - Scolarité</h3>
                <hr />
                <Doughnut data={this.state.studentData} />
              </Panel>
            </div>
            <div className="col-lg-4 text-center">
              <Panel>
                <h3>Candidats - Genre</h3>
                <hr />
                <Doughnut data={this.state.genderData} />
              </Panel>
            </div>
            <div className="col-lg-4 text-center">
              <Panel>
                <h3>Candidats - Majeure</h3>
                <hr />
                <Doughnut data={this.state.majorData} />
              </Panel>
            </div>
          </div>
          <Panel header="Candidatures par PEPITE">
            <ApplicationSummaryTable applicationSummaryList={this.state.applicationSummary} />
          </Panel>
        </div>
      </div>
    )
  }
}

export default StatPage
