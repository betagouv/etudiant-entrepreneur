import React, {PropTypes} from 'react'
import SaveForm from './SaveForm'
import Validation from '../../common/Validation'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as applicationActions from '../../../actions/applicationActions'

export class SavePage extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <SaveForm
        link={this.props.link} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    link: window.location.href.replace(/application(\/)?.*/, `application/${state.application.id}`)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(applicationActions, dispatch),
  }
}

SavePage.propTypes = {
  link: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SavePage)
