import React, {PropTypes} from 'react'

const TeamMemberRow = ({member}) => {
  return (
    <tr>
      <td>{member.firstname}</td>
      <td>{member.name}</td>
      <td>{member.role}</td>
      <td>{member.diploma}</td>
    </tr>
  )
}

TeamMemberRow.propTypes = {
  member: PropTypes.object.isRequired,
}

export default TeamMemberRow
