import React, { PropTypes } from 'react'
import { Glyphicon } from 'react-bootstrap'
import PepiteApplicantRow from './PepiteApplicantRow'

const PepiteApplicantTable = ({applicants}) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Email</th>
          <th>Établissement</th>
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
}

export default PepiteApplicantTable
