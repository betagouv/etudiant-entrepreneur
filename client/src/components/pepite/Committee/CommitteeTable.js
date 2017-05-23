import React, { PropTypes } from 'react'
import CommitteeRow from './CommitteeRow'

const CommitteeTable = ({committees, removeCommittee, editCommittee}) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Date du comité</th>
          <th>Date de fin de candidature</th>
          <th>Ajouté le</th>
          <th>Modifié le</th>
          <th>Editer</th>
          <th>Supprimer</th>
        </tr>
      </thead>
      <tbody>
        {committees.map((committe, i) => { return (<CommitteeRow key={i} committe={committe} removeCommittee={removeCommittee} editCommittee={editCommittee}/>) })}
      </tbody>
    </table>
  )
}

CommitteeTable.propTypes = {
  committees: PropTypes.array.isRequired,
  removeCommittee: PropTypes.func.isRequired,
  editCommittee: PropTypes.func.isRequired,
}

export default CommitteeTable
