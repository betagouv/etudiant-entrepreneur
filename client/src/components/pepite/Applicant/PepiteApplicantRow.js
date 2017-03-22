import React, { PropTypes } from 'react'
import { Glyphicon } from 'react-bootstrap'
import GraduationLabel from './GraduationLabel'
import { Link } from 'react-router'
import TimeSinceControl from './TimeSinceControl'

const PepiteApplicantRow = ({ application }) => {
  return (
    <tr>
      <td><TimeSinceControl textDate={application.sentDate} /></td>
      <td>{application.contact.name}</td>
      <td>{application.contact.firstname}</td>
      <td>{application.contact.email}</td>
      <td>{application.career.diploma.establishment}</td>
      <td><GraduationLabel application={application} /></td>
      <td><a className="btn btn-info btn-xs" target="_blank" href={`/application/${application._id}/print`}><Glyphicon glyph="print" /></a></td>
      <td><Link to={`/pepite/committeeAnswer/${application._id}`} className="btn btn-info btn-xs"><Glyphicon glyph="edit" /></Link></td>
    </tr>
  )
}

PepiteApplicantRow.propTypes = {
  application: PropTypes.object.isRequired,
}

export default PepiteApplicantRow
