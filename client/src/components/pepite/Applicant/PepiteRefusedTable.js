import React, { PropTypes } from 'react'
import { Glyphicon } from 'react-bootstrap'
import PepiteRefusedApplicantRow from './PepiteRefusedApplicantRow'
import TableHeader from '../../common/Table/TableHeader'

const PepiteRefusedTable = ({ applicants, sort }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <TableHeader onSort={sort} field="contact.schoolYear">Promotion</TableHeader>
          <TableHeader onSort={sort} field="contact.name">Nom</TableHeader>
          <TableHeader onSort={sort} field="contact.firstname">Prénom</TableHeader>
          <TableHeader onSort={sort} field="contact.email">Email</TableHeader>
          <TableHeader onSort={sort} field="career.diploma.establishment">Établissement</TableHeader>
          <th>Statut</th>
          <th>Version imprimable</th>
        </tr>
      </thead>
      <tbody>
        {applicants.map((application, i) => { return (<PepiteRefusedApplicantRow key={i} application={application} />) })}
      </tbody>
    </table>
  )
}

PepiteRefusedTable.propTypes = {
  applicants: PropTypes.array.isRequired,
  sort: PropTypes.func.isRequired
}

export default PepiteRefusedTable
