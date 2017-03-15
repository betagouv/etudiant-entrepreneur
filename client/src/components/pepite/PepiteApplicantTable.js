import React, { PropTypes } from 'react'
import { Glyphicon } from 'react-bootstrap'
import PepiteApplicantRow from './PepiteApplicantRow'
import TableHeader from '../common/Table/TableHeader'

const PepiteApplicantTable = ({applicants, sort}) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <TableHeader onSort={sort} field="sentDate">Reçue depuis</TableHeader>
          <TableHeader onSort={sort} field="contact.name">Nom</TableHeader>
          <TableHeader onSort={sort} field="contact.firstname">Prénom</TableHeader>
          <TableHeader onSort={sort} field="contact.email">Email</TableHeader>
          <TableHeader onSort={sort} field="career.diploma.establishment">Établissement</TableHeader>
          <th>Statut</th>
          <th>Version imprimable</th>
          <th>Comité d'engagement</th>
        </tr>
      </thead>
      <tbody>
        {applicants.map((application, i) => { return (<PepiteApplicantRow key={i} application={application} />) })}
      </tbody>
    </table>
  )
}

PepiteApplicantTable.propTypes = {
  applicants: PropTypes.array.isRequired,
  sort: PropTypes.func.isRequired,
}

export default PepiteApplicantTable
