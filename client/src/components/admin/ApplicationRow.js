import React, { PropTypes } from 'react'
import TimeSinceControl from '../pepite/Applicant/TimeSinceControl'
import StatusLabel from '../pepite/Applicant/StatusLabel'

const ApplicationRow = ({ application, pepites }) => {
  const pepiteName = (application.pepite &&
    application.pepite.pepite &&
    application.pepite.pepite != '0' &&
    Number(application.pepite.pepite) <= pepites.length) ?
    pepites[Number(application.pepite.pepite) - 1].name : '-'

  const establishmentName = (application.career && application.career.diploma) ?
    application.career.diploma.establishment :
    '-'

  return (
    <tr>
      <td>{application.sentDate ? <TimeSinceControl textDate={application.sentDate} /> : '-'}</td>
      <td>{application.contact.schoolYear}</td>
      <td>{application.contact.email}</td>
      <td>{application.contact.name}</td>
      <td>{application.contact.firstname}</td>
      <td>{establishmentName}</td>
      <td>{pepiteName}</td>
      <td><StatusLabel status={application.status} /></td>
      <td><a className="btn btn-info btn-xs" target="_blank" href={`/application/${application._id}`}><span className="glyphicon glyphicon-file"></span></a></td>
    </tr>
  )
}

ApplicationRow.propTypes = {
  application: PropTypes.object.isRequired,
  pepites: PropTypes.array.isRequired,
}

export default ApplicationRow
