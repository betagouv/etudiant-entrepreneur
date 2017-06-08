/*global API_URI*/
import React, { PropTypes } from 'react'
import { Glyphicon } from 'react-bootstrap'
import GraduationLabel from '../Applicant/GraduationLabel'
import { Link } from 'react-router'

const StudentRow = ({ student, userToken }) => {
  return (
    <tr>
      <td>{student.contact.name}</td>
      <td>{student.contact.firstname}</td>
      <td>{student.contact.email}</td>
      <td>{student.career.diploma.establishment}</td>
      <td><GraduationLabel application={student} /></td>
      <td><a className="btn btn-info btn-xs" target="_blank" href={`/application/${student._id}`}><Glyphicon glyph="file" /></a></td>
      <td>
        <a
          className="btn btn-primary btn-xs"
          target="_blank"
          href={`${API_URI}/application/${student._id}/certificate?access_token=${userToken}`}>
          <Glyphicon glyph="save-file" />
        </a>
      </td>
    </tr>
  )
}

StudentRow.propTypes = {
  student: PropTypes.object.isRequired,
  userToken: PropTypes.string.isRequired
}

export default StudentRow
