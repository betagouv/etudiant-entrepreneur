import React, {PropTypes} from 'react'
import { Glyphicon, Button } from 'react-bootstrap'

const EntrepreneurshipRow = ({entrepreneurship, onEntrepreneurshipDelete}) => {
  const handlerEntrepreneurshipRemove = () => {
    onEntrepreneurshipDelete(entrepreneurship)
  }

  return (
    <tr>
      <td>{entrepreneurship.name}</td>
      <td>{entrepreneurship.year}</td>
      <td>{entrepreneurship.desc}</td>
      <td><Button bsSize="xsmall" bsStyle="danger" onClick={handlerEntrepreneurshipRemove}><Glyphicon glyph="trash"/></Button></td>
    </tr>
  )
}

EntrepreneurshipRow.propTypes = {
  entrepreneurship: PropTypes.object.isRequired,
  onEntrepreneurshipDelete: PropTypes.func.isRequired
}

export default EntrepreneurshipRow
