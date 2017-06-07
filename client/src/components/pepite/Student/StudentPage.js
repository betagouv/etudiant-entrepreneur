import React, { PropTypes } from 'react'
import toastr from 'toastr'
import { Tab, Tabs } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as studentActions from '../../../actions/studentActions'
import StudentTable from './StudentTable'
import { getCurrentYear, getCurrentUniversityYear } from '../../../components/common/yearHelper'

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
          <h1>Mes étudiants</h1>
        </div>
        <Tabs defaultActiveKey={1} id="student-tab">
          <Tab eventKey={1} title={<div>Promotion {getCurrentUniversityYear()} <span className="badge">{this.props.students.length}</span></div>}>
            <StudentTable students={this.props.students} userToken={this.props.user.token} sort={this.sort} />
          </Tab>
          <Tab eventKey={2} title={<div>Alumnis <span className="badge">{this.props.alumnis.length}</span></div>}>
            <StudentTable students={this.props.alumnis} userToken={this.props.user.token} sort={this.sort} />
          </Tab>
        </Tabs>
      </div>
    )
  }
}

function isStudent(application) {
  return application.contact.schoolYear === getCurrentYear()
}

function isAlumni(application) {
  return !isStudent(application)
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    students: state.students.filter(isStudent),
    alumnis: state.students.filter(isAlumni)
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
  alumnis: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentPage)
