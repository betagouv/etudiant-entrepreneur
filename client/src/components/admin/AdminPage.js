import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as pepiteListActions from '../../actions/pepiteListActions'
import ApplicationFilterForm from './ApplicationFilterForm'

export class AdminPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      filter: {
        pepite: 0,
        name: '',
        establishment: '',
        email: ''
      }
    }

    this.filterApplication = this.filterApplication.bind(this)
    this.clearFilter = this.clearFilter.bind(this)
    this.onFilterChange = this.onFilterChange.bind(this)
  }

  componentDidMount() {
    this.props.pepiteListActions.loadPepiteList()
  }

  onFilterChange(event) {
    const field = event.target.name
    const filter = this.state.filter
    filter[field] = event.target.value
    this.setState(filter)
  }

  filterApplication() {
  }

  clearFilter(event) {
    event.preventDefault()
    this.setState({
      filter: {
        pepite: 0,
        name: '',
        establishment: '',
        email: ''
      }
    })
  }

  render() {
    return (
      <div className="container back-content">
        <div className="page-header">
          <h1>Candidatures</h1>
        </div>
        <ApplicationFilterForm
          filter={this.state.filter}
          onChange={this.onFilterChange}
          onFilter={this.filterApplication}
          onClearFilter={this.clearFilter}
          pepiteList={this.props.pepiteList}
        />
      </div>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {
    pepiteList: state.pepiteList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pepiteListActions: bindActionCreators(pepiteListActions, dispatch),
  }
}

AdminPage.propTypes = {
  pepiteListActions: PropTypes.object.isRequired,
  pepiteList: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)
