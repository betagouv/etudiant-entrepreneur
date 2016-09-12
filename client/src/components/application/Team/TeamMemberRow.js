import React, {PropTypes} from 'react'
import { Glyphicon, Button } from 'react-bootstrap'

const TeamMemberRow = ({member, onMemberDelete}) => {
  const handlerMemberRemove = () => {
    onMemberDelete(member)
  }

  return (
    <tr>
      <td>{member.firstname}</td>
      <td>{member.name}</td>
      <td>{member.role}</td>
      <td>{member.email}</td>
      <td><Button bsSize="xsmall" bsStyle="danger" onClick={handlerMemberRemove}><Glyphicon glyph="trash"/></Button></td>
    </tr>
  )
}

TeamMemberRow.propTypes = {
  member: PropTypes.object.isRequired,
  onMemberDelete: PropTypes.func.isRequired
}

export default TeamMemberRow
