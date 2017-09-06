/*global API_URI*/
import React, { PropTypes } from 'react'
import { Glyphicon } from 'react-bootstrap'
import GraduationLabel from './GraduationLabel'
import { Link } from 'react-router'

const PepiteRefusedApplicantRow = ({ application }) => {
  return (
    <tr>
      <td>{application.contact.schoolYear}</td>
      <td>{application.contact.name}</td>
      <td>{application.contact.firstname}</td>
      <td>{application.contact.email}</td>
      <td>{application.career.diploma.establishment}</td>
      <td><GraduationLabel application={application} /></td>
      <td><a className="btn btn-info btn-xs" target="_blank" href={`/application/${application._id}/print`}><Glyphicon glyph="print" /></a></td>
    </tr>
  )
}

PepiteRefusedApplicantRow.propTypes = {
  application: PropTypes.object.isRequired
}

export default PepiteRefusedApplicantRow
