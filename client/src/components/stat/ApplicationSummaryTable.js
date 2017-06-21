import React, { PropTypes } from 'react'
import { Glyphicon } from 'react-bootstrap'
import ApplicationSummaryRow from './ApplicationSummaryRow'

const ApplicationSummaryTable = ({ applicationSummaryList }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Pepite</th>
          <th>En attente</th>
          <th>Acceptées</th>
          <th>Refusées</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {applicationSummaryList.map((applicationSummary, i) => { return (<ApplicationSummaryRow key={i} applicationSummary={applicationSummary} />) })}
      </tbody>
    </table>
  )
}

ApplicationSummaryTable.propTypes = {
  applicationSummaryList: PropTypes.array.isRequired
}

export default ApplicationSummaryTable
