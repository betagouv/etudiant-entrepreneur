import React, { PropTypes } from 'react'
import { Glyphicon } from 'react-bootstrap'
import PepiteAcceptedApplicantRow from './PepiteAcceptedApplicantRow'

const PepiteAcceptedApplicantTable = ({applicants, userToken}) => {
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
          <th>Attestation</th>
        </tr>
      </thead>
      <tbody>
        {applicants.map((application, i) => { return (<PepiteAcceptedApplicantRow key={i} application={application} userToken={userToken} />) })}
      </tbody>
    </table>
  )
}

PepiteAcceptedApplicantTable.propTypes = {
  applicants: PropTypes.array.isRequired,
  userToken: PropTypes.string.isRequired
}

export default PepiteAcceptedApplicantTable
