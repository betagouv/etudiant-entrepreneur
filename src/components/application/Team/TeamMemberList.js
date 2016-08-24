import React, {PropTypes} from 'react'
import { Table, Panel } from 'react-bootstrap'
import TeamMemberRow from './TeamMemberRow'

const TeamMemberList = ({team}) => {
  if (team.length != 0) {
    return (
      <Panel header="Mon équipe">
        <Table>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>rôle dans le projet</th>
              <th>diplôme</th>
            </tr>
          </thead>
          <tbody>
            {team.map((member) => { return (<TeamMemberRow key={member.firstname + member.name} member={member} />) }) }
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
}

export default TeamMemberList
