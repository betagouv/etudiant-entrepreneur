import React, { PropTypes } from 'react'
import OtherApplicationRow from './OtherApplicationRow'

const OtherApplicationTable = ({ applications, pepites }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Pepite</th>
          <th>Statut</th>
          <th>Depuis</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((application, i) => { return (<OtherApplicationRow key={i} application={application} pepites={pepites}/>) })}
      </tbody>
    </table>
  )
}

OtherApplicationTable.propTypes = {
  applications: PropTypes.array.isRequired,
  pepites: PropTypes.array.isRequired
}

export default OtherApplicationTable
