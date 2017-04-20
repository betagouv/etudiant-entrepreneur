import React, { PropTypes } from 'react'
import { Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router'
import Moment from 'moment'

const CommitteeRow = ({committe, removeCommittee, editCommittee}) => {
  const onRemove = (event) => {
    event.preventDefault()
    removeCommittee(committe)
  }

  const onEdit = (event) => {
    event.preventDefault()
    editCommittee(committe)
  }

  return (
    <tr>
      <td>{new Moment(committe.date).format('DD/MM/YYYY')}</td>
      <td>{new Moment(committe.lastApplicationDate).format('DD/MM/YYYY')}</td>
      <td>{new Moment(committe.createdAt).format('DD/MM/YYYY à hh:mm')}</td>
      <td>{new Moment(committe.updatedAt).format('DD/MM/YYYY à hh:mm')}</td>
      <td><a className="btn btn-info btn-xs" target="_blank" onClick={onEdit}><Glyphicon glyph="edit" /></a></td>
      <td><a className="btn btn-danger btn-xs" target="_blank" onClick={onRemove}><Glyphicon glyph="remove" /></a></td>
    </tr>
  )
}

CommitteeRow.propTypes = {
  committe: PropTypes.object.isRequired,
  removeCommittee: PropTypes.func.isRequired,
  editCommittee: PropTypes.func.isRequired
}

export default CommitteeRow
