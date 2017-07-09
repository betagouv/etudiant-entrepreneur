import React, { PropTypes } from 'react'
import TimeSinceControl from './TimeSinceControl'
import StatusLabel from './StatusLabel'

const OtherApplicationRow = ({ application }) => {
  return (
    <tr>
      <td> {application.pepite}</td>
      <td><StatusLabel status={application.status}/></td>
      <td><TimeSinceControl textDate={application.sentDate}/></td>
    </tr>
  )
}

OtherApplicationRow.propTypes = {
  application: PropTypes.array.isRequired
}

export default OtherApplicationRow
