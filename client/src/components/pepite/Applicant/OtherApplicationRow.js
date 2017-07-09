import React, { PropTypes } from 'react'
import TimeSinceControl from './TimeSinceControl'
import StatusLabel from './StatusLabel'

const OtherApplicationRow = ({ application, pepites }) => {
  return (
    <tr>
      <td> {pepites[application.pepite - 1].name}</td>
      <td><StatusLabel status={application.status}/></td>
      <td><TimeSinceControl textDate={application.sentDate}/></td>
    </tr>
  )
}

OtherApplicationRow.propTypes = {
  application: PropTypes.object.isRequired,
  pepites: PropTypes.array.isRequired,
}

export default OtherApplicationRow
