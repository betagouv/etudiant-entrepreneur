import React, { PropTypes } from 'react'
import toastr from 'toastr'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as studentActions from '../../../actions/studentActions'
import StudentTable from './StudentTable'

export class StudentPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.sort = this.sort.bind(this)
  }

  componentDidMount() {
    this.props.actions.loadPepiteStudents()
      .then(() => {
      })
      .catch((err) => {
        toastr.error(err)
      })
  }

  sort(order, field) {
    this.props.actions.sortStudents(order, field)
  }

  render() {
    return (
      <div className="container back-content">
        <div className="page-header">
          <h1>Ma promotion</h1>
        </div>
        <StudentTable students={this.props.students} userToken={this.props.user.token} sort={this.sort} />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    students: state.students
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(studentActions, dispatch),
  }
}

StudentPage.propTypes = {
  actions: PropTypes.object.isRequired,
  students: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentPage)
