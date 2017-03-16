import React, { PropTypes } from 'react'
import { Glyphicon, Pagination } from 'react-bootstrap'
import PepiteApplicantRow from './PepiteApplicantRow'
import TableHeader from '../common/Table/TableHeader'

export class PepiteApplicantTable extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      activePage: 1,
      itemsPerPage: 15
    }
    this.handlePageSelect = this.handlePageSelect.bind(this)
  }

  handlePageSelect(eventKey) {
    this.setState({
      activePage: eventKey
    })
  }

  displayedItems() {
    return this.props.applicants.slice(
      (this.state.activePage - 1) * this.state.itemsPerPage,
      (this.state.activePage) * this.state.itemsPerPage)
  }

  numberOfPages() {
    return Math.ceil(this.props.applicants.length / this.state.itemsPerPage)
  }

  render() {
    const { applicants, sort } = this.props
    return (
      <div>
        <Pagination
          prev
          next
          ellipsis
          boundaryLinks
          items={this.numberOfPages()}
          maxButtons={5}
          activePage={this.state.activePage}
          onSelect={this.handlePageSelect} />

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
      </div>
    )
  }
}

PepiteApplicantTable.propTypes = {
  applicants: PropTypes.array.isRequired,
  sort: PropTypes.func.isRequired,
}

export default PepiteApplicantTable
