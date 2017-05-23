import React, { PropTypes } from 'react'

const GraduationLabel = ({application}) => {
  if (application.contact.situation == 'student' && application.profile.situation == 'student') {
    return (<span className="label label-info">Étudiant</span>)
  } else {
    return (<span className="label label-primary">Diplômé</span>)
  }
}

GraduationLabel.propTypes = {
  application: PropTypes.object.isRequired,
}

export default GraduationLabel
