import React, { PropTypes } from 'react'
import './Card.css'

const Card = ({ title, glyphicon, isDisabled }) => {
  const panelType = isDisabled ? 'panel-disabled' : 'panel-primary'

  return (
    <div className={`panel ${panelType}`}>
      <div className="panel-heading card-background">
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
  glyphicon: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool
}

export default Card
