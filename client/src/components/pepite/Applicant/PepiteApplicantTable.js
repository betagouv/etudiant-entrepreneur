import React, { PropTypes } from 'react'
import { Glyphicon, Pagination, Panel } from 'react-bootstrap'
import PepiteApplicantRow from './PepiteApplicantRow'
import TableHeader from '../../common/Table/TableHeader'
import PepiteApplicantFilterForm from './PepiteApplicantFilterForm'

export class PepiteApplicantTable extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      activePage: 1,
      itemsPerPage: 10,
      filter: {
        name: '',
        email: '',
        establishment: '',
      }
    }
    this.handlePageSelect = this.handlePageSelect.bind(this)
    this.clearFilter = this.clearFilter.bind(this)
    this.onFilterChange = this.onFilterChange.bind(this)
  }

  handlePageSelect(eventKey) {
    this.setState({
      activePage: eventKey
    })
  }

  displayedItems() {
    return this.props.applicants
      .filter(this.filter(this))
      .slice((this.state.activePage - 1) * this.state.itemsPerPage,
      (this.state.activePage) * this.state.itemsPerPage)
  }

  filter(context) {
    return (value) => {
      let isDisplayed = true
      if (this.state.filter.name) {
        isDisplayed &= value.contact.name.toLowerCase().includes(this.state.filter.name.toLowerCase())
      }
      if (this.state.filter.email) {
        isDisplayed &= value.contact.email.toLowerCase().includes(this.state.filter.email.toLowerCase())
      }
      if (this.state.filter.establishment) {
        isDisplayed &= value.career.diploma.establishment.toLowerCase().includes(this.state.filter.establishment.toLowerCase())
      }
      return isDisplayed
    }
  }

  clearFilter() {
    this.setState({
      filter: {
        name: '',
        email: '',
        establishment: '',
      }
    })
  }

  numberOfPages() {
    return Math.ceil(this.props.applicants.length / this.state.itemsPerPage)
  }

  onFilterChange(event) {
    const field = event.target.name
    let filter = this.state.filter
    filter[field] = event.target.value
    return this.setState({ filter })
  }

  render() {
    const { applicants, sort } = this.props
    return (
      <div>
        <PepiteApplicantFilterForm
          name={this.state.filter.name}
          email={this.state.filter.email}
          establishment={this.state.filter.establishment}
          onChange={this.onFilterChange}
          clearFilter={this.clearFilter} />

        <table className="table table-hover">
          <thead>
            <tr>
              <TableHeader onSort={sort} field="sentDate">Reçue depuis</TableHeader>
              <TableHeader onSort={sort} field="contact.name">Nom</TableHeader>
              <TableHeader onSort={sort} field="contact.firstname">Prénom</TableHeader>
              <TableHeader onSort={sort} field="contact.email">Email</TableHeader>
              <TableHeader onSort={sort} field="career.diploma.establishment">Établissement</TableHeader>
              <th>Statut</th>
              <th>Version imprimable</th>
              <th>Comité d'engagement</th>
            </tr>
          </thead>
          <tbody>
            {this.displayedItems().map((application, i) => { return (<PepiteApplicantRow key={i} application={application} />) })}
          </tbody>
        </table>

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

PepiteApplicantTable.propTypes = {
  applicants: PropTypes.array.isRequired,
  sort: PropTypes.func.isRequired,
}

export default PepiteApplicantTable
