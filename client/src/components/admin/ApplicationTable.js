import React, { PropTypes } from 'react'
import ApplicationRow from './ApplicationRow'

const ApplicationTable = ({ applications, pepites }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Depuis</th>
          <th>Promotion</th>
          <th>Email</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Établissement</th>
          <th>Pepite</th>
          <th>Statut</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((application, i) => { return (<ApplicationRow key={i} application={application} pepites={pepites}/>) })}
      </tbody>
    </table>
  )
}

ApplicationTable.propTypes = {
  applications: PropTypes.array.isRequired,
  pepites: PropTypes.array.isRequired
}

export default ApplicationTable
