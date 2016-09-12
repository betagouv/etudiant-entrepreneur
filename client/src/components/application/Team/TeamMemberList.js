import React, {PropTypes} from 'react'
import { Table, Panel } from 'react-bootstrap'
import TeamMemberRow from './TeamMemberRow'

const TeamMemberList = ({team, onMemberDelete}) => {
  if (team.length != 0) {
    return (
      <Panel header="Mon équipe">
        <Table>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Rôle</th>
              <th>Email</th>
              <th>Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {team.map((member) => { return (<TeamMemberRow key={member.firstname + member.name} member={member} onMemberDelete={onMemberDelete}/>) }) }
          </tbody>
        </Table>
      </Panel>
    )
  }
  else {
    return null
  }
}

TeamMemberList.propTypes = {
  team: PropTypes.array.isRequired,
  onMemberDelete: PropTypes.func.isRequired,
}

export default TeamMemberList
