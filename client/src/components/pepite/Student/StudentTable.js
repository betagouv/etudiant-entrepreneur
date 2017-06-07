import React, { PropTypes } from 'react'
import { Glyphicon } from 'react-bootstrap'
import StudentRow from './StudentRow'
import TableHeader from '../../common/Table/TableHeader'

const StudentTable = ({ students, userToken, sort }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <TableHeader onSort={sort} field="contact.name">Nom</TableHeader>
          <TableHeader onSort={sort} field="contact.firstname">Prénom</TableHeader>
          <TableHeader onSort={sort} field="contact.email">Email</TableHeader>
          <TableHeader onSort={sort} field="career.diploma.establishment">Établissement</TableHeader>
          <th>Statut</th>
          <th>Version imprimable</th>
          <th>Attestation</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, i) => { return (<StudentRow key={i} student={student} userToken={userToken} />) })}
      </tbody>
    </table>
  )
}

StudentTable.propTypes = {
  students: PropTypes.array.isRequired,
  userToken: PropTypes.string.isRequired,
  sort: PropTypes.func.isRequired,
}

export default StudentTable
