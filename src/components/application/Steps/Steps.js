import React, { Component, PropTypes } from 'react'
import ProjectStep from './ProjectStep'
import InformationStep from './InformationStep'

const Steps =
  [
    { name: 'Mon Projet', component: <ProjectStep/> },
    { name: 'Informations', component: <InformationStep/> }
  ]

export default Steps
