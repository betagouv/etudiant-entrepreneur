import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'

import statApi from '../../api/statApi'
import ApplicationSummaryTable from './ApplicationSummaryTable'

class StatPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      applicationSummary: []
    }
  }

  componentDidMount() {
    statApi.getApplicationSummary().then(((applicationSummary) => {
      this.setState({ applicationSummary })
    }))
  }

  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h1>Métriques du service</h1>
          <Panel header="Candidatures par PEPITE">
          <ApplicationSummaryTable applicationSummaryList={this.state.applicationSummary} />
        </Panel>
        </div>
      </div>
    )
  }
}

export default StatPage
