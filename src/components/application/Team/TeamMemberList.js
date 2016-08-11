import React, {PropTypes} from 'react'
import { Table } from 'react-bootstrap'
import TeamMemberRow from './TeamMemberRow'

const TeamMemberList = ({team}) => {
  if (team.length != 0)
    return (
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
          {team.map((member) => { return(<TeamMemberRow key={member.firstname + member.name} member={member} />) })}
        </tbody>
      </Table>
    )
  else
    return (<p>Oups, tu n'as pas encore de membre, n'hésite pas à en ajouter !</p>)
}

TeamMemberList.propTypes = {
  team: PropTypes.array.isRequired,
}

export default TeamMemberList
