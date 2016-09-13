import React, {PropTypes} from 'react'
import {Table} from 'react-bootstrap'
import EntrepreneurshipRow from './EntrepreneurshipRow'

const EntrepreneurshipList = ({entrepreneurship, onEntrepreneurshipDelete}) => {
  if (entrepreneurship.length != 0) {
    return (
        <Table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Année</th>
              <th>Description</th>
              <th>Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {entrepreneurship.map((e, index) => {
              return (<EntrepreneurshipRow key={index} entrepreneurship={e} onEntrepreneurshipDelete={onEntrepreneurshipDelete}/>)
            })}
          </tbody>
        </Table>
    )
  }
  else {
    return null
  }
}

EntrepreneurshipList.propTypes = {
  entrepreneurship: PropTypes.array.isRequired,
  onEntrepreneurshipDelete: PropTypes.func.isRequired,
}

export default EntrepreneurshipList
