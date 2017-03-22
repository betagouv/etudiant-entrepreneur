import React, { PropTypes } from 'react'
import ApplicantPage from './Applicant/ApplicantPage'

export class PepiteHomePage extends React.Component {
  constructor(props, context) {
    super(props, context)
  }
  render() {
    return (
      <ApplicantPage/>
    )
  }
}

export default PepiteHomePage
