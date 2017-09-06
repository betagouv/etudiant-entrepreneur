import React, { PropTypes } from 'react'
import { Label } from 'react-bootstrap'

function statusToLabel(status) {
  switch (status) {
    case 'accepted':
      return {
        style: 'success',
        text: 'accepté'
      }
    case 'refused':
      return {
        style: 'danger',
        text: 'refusé'
      }
    case 'sent':
      return {
        style: 'info',
        text: 'en attente'
      }
    case 'saved':
      return {
        style: 'primary',
        text: 'sauvegardé'
      }
    case 'dropped':
      return {
        style: 'warning',
        text: 'abandon'
      }
    default:
      return {
        style: 'warning',
        text: 'inconnu'
      }
  }
}

const StatusLabel = ({ status }) => {
  const label = statusToLabel(status)

  return (
    <Label bsStyle={label.style}>{label.text}</Label>
  )
}

StatusLabel.propTypes = {
  status: PropTypes.string.isRequired
}

export default StatusLabel
