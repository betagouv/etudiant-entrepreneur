import React from 'react'
import {Link} from 'react-router'
import Multistep from '../common/MultiStep'
import Steps from './Steps/Steps'

class ApplicationPage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <div>
          <Multistep initialStep={1} steps={Steps}/>
        </div>
      </div >
    )
  }
}

export default ApplicationPage
