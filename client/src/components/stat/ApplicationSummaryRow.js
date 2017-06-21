import React, { PropTypes } from 'react'
import { Glyphicon } from 'react-bootstrap'

function displayApplicationCount(count) {
  return count ? count : 0
}

function getApplicationTotal() {
  let applicationTotal = 0
  for (let index = 0; index < arguments.length; index++) {
    if (typeof arguments[index] === 'number') {
      applicationTotal += arguments[index]
    }
  }
  return applicationTotal
}

const ApplicationSummaryRow = ({ applicationSummary }) => {
  return (
    <tr>
      <td>{ applicationSummary.name }</td>
      <td>{ displayApplicationCount(applicationSummary.sent) }</td>
      <td>{ displayApplicationCount(applicationSummary.accepted) }</td>
      <td>{ displayApplicationCount(applicationSummary.refused) }</td>
      <td>{ getApplicationTotal(applicationSummary.accepted, applicationSummary.refused, applicationSummary.sent) }</td>
    </tr>
  )
}

ApplicationSummaryRow.propTypes = {
  applicationSummary: PropTypes.object.isRequired
}

export default ApplicationSummaryRow
