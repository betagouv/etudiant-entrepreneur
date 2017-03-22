import React, { PropTypes } from 'react'

const Card = ({ title, glyphicon }) => {
  return (
    <div className="panel panel-primary">
      <div className="panel-heading">
        <h2 className="card-title">
          {title}
        </h2>
        <div className="card-icon">
          <span className={glyphicon} aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  glyphicon: PropTypes.string.isRequired
}

export default Card
