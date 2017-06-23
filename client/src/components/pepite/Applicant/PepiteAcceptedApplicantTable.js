import React, { PropTypes } from 'react'
import { Glyphicon } from 'react-bootstrap'
import PepiteAcceptedApplicantRow from './PepiteAcceptedApplicantRow'
import TableHeader from '../../common/Table/TableHeader'

const PepiteAcceptedApplicantTable = ({ applicants, sort }) => {
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
          <th>Comité d'engagement</th>
        </tr>
      </thead>
      <tbody>
        {applicants.map((application, i) => { return (<PepiteAcceptedApplicantRow key={i} application={application} />) })}
      </tbody>
    </table>
  )
}

PepiteAcceptedApplicantTable.propTypes = {
  applicants: PropTypes.array.isRequired,
  sort: PropTypes.func.isRequired
}

export default PepiteAcceptedApplicantTable
