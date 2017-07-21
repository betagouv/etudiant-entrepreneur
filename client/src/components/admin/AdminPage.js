import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as pepiteListActions from '../../actions/pepiteListActions'
import * as applicationActions from '../../actions/applicationActions'
import ApplicationFilterForm from './ApplicationFilterForm'
import ApplicationTable from './ApplicationTable'
import { Pagination } from 'react-bootstrap'

const ITEMS_PER_PAGE = 10

export class AdminPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      filter: {
        pepite: 0,
        name: '',
        establishment: '',
        email: '',
        status: ''
      },
      applications: [],
      activePage: 1,
      totalApplications: 0
    }

    this.filterApplication = this.filterApplication.bind(this)
    this.clearFilter = this.clearFilter.bind(this)
    this.onFilterChange = this.onFilterChange.bind(this)
    this.numberOfPages = this.numberOfPages.bind(this)
    this.handlePageSelect = this.handlePageSelect.bind(this)
  }

  componentDidMount() {
    this.props.pepiteListActions.loadPepiteList()
  }


  handlePageSelect(selectedPage) {
    this.setState({
      activePage: selectedPage
    })
    this.loadApplication(selectedPage)
  }

  numberOfPages() {
    return Math.ceil(this.state.totalApplications / ITEMS_PER_PAGE)
  }

  onFilterChange(event) {
    const field = event.target.name
    const filter = this.state.filter
    filter[field] = event.target.value
    this.setState(filter)
  }

  filterApplication(event) {
    event.preventDefault()
    this.setState({
      activePage: 1
    })
    this.loadApplication()
  }

  loadApplication(page = 1) {
    this.props.applicationActions.getAllApplication(
      groomFilter(Object.assign({}, this.state.filter)),
      page)
      .then((res) => {
        this.setState({
          applications: res.applications,
          totalApplications: res.total
        })
      })
  }

  clearFilter(event) {
    event.preventDefault()
    this.setState({
      filter: {
        pepite: 0,
        name: '',
        establishment: '',
        email: '',
        status: ''
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
        <ApplicationTable
          applications={this.state.applications}
          pepites={this.props.pepiteList}
        />

        <Pagination
          prev
          next
          ellipsis
          boundaryLinks
          items={this.numberOfPages()}
          maxButtons={5}
          activePage={this.state.activePage}
          onSelect={this.handlePageSelect} />
      </div>
    )
  }
}

function groomFilter(filter) {
  const propNames = Object.getOwnPropertyNames(filter)
  for (let i = 0; i < propNames.length; i++) {
    let propName = propNames[i]
    if (!filter[propName]) {
      delete filter[propName]
    }
  }
  return filter
}

function mapStateToProps(state, ownProps) {
  return {
    pepiteList: state.pepiteList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pepiteListActions: bindActionCreators(pepiteListActions, dispatch),
    applicationActions: bindActionCreators(applicationActions, dispatch)
  }
}

AdminPage.propTypes = {
  pepiteListActions: PropTypes.object.isRequired,
  applicationActions: PropTypes.object.isRequired,
  pepiteList: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)
