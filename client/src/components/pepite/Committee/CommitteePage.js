import React, { PropTypes } from 'react'
import toastr from 'toastr'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Panel, FormControl, ControlLabel, FormGroup } from 'react-bootstrap'

import pepiteApi from '../../../api/pepiteApi'
import * as committeeActions from '../../../actions/committeeActions'
import CommitteeDetailModal from './CommitteeDetailModal'
import CommitteeTable from './CommitteeTable'
import NextCommittee from './NextCommittee'

class CommitteePage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isAddModalShown: false,
      isEditModalShown: false,
      editedCommittee: {},
      pepiteName: ''
    }
    this.removeCommittee = this.removeCommittee.bind(this)
    this.addCommittee = this.addCommittee.bind(this)
    this.editCommittee = this.editCommittee.bind(this)
    this.openAddModal = this.openAddModal.bind(this)
    this.closeAddModal = this.closeAddModal.bind(this)
    this.openEditModal = this.openEditModal.bind(this)
    this.closeEditModal = this.closeEditModal.bind(this)
  }

  componentDidMount() {
    this.props.actions.loadPepiteCommittees().catch((err) => {
      toastr.error(err)
    })
    pepiteApi.getPepite(this.props.pepiteId).then((pepite) => {
      this.setState({ pepiteName: pepite.name })
    })
  }

  addCommittee(committee) {
    this.closeAddModal()
    this.props.actions.createCommittee(committee).catch((err) => {
      toastr.error(err)
    })
  }

  editCommittee(committee) {
    this.closeEditModal()
    this.props.actions.updateCommittee(committee).catch((err) => {
      toastr.error(err)
    })
  }

  removeCommittee(committee) {
    this.props.actions.deleteCommittee(committee).catch((err) => {
      toastr.error(err)
    })
  }

  openAddModal() {
    this.setState({ isAddModalShown: true })
  }

  closeAddModal() {
    this.setState({ isAddModalShown: false })
  }

  openEditModal(editedCommittee) {
    this.setState({
      editedCommittee,
      isEditModalShown: true
    })
  }

  closeEditModal() {
    this.setState({ isEditModalShown: false })
  }

  render() {
    return (
      <div className="container back-content">
        <div className="page-header">
          <h1>Mes comités d'engagement</h1>
        </div>
        <div className="row">
          <button type="button" className="btn btn-success" onClick={this.openAddModal}>
            Ajouter
          </button>
        </div>
        <CommitteeTable committees={this.props.committees} removeCommittee={this.removeCommittee} editCommittee={this.openEditModal} />
        <Panel header="Message actuellement affiché aux candidats" bsStyle="primary">
          <FormGroup className="required">
            <ControlLabel>Mon PEPITE</ControlLabel>
            <FormControl name="pepite" componentClass="select" disabled>
              <option value={0}>{this.state.pepiteName}</option>
            </FormControl>
          </FormGroup>
          <NextCommittee />
        </Panel>
        <CommitteeDetailModal submitCommittee={this.addCommittee} isShown={this.state.isAddModalShown} close={this.closeAddModal} />
        <CommitteeDetailModal submitCommittee={this.editCommittee} isShown={this.state.isEditModalShown} close={this.closeEditModal} committee={this.state.editedCommittee} />
      </div>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {
    committees: state.committees,
    pepiteId: state.user.id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(committeeActions, dispatch),
  }
}

CommitteePage.propTypes = {
  actions: PropTypes.object.isRequired,
  committees: PropTypes.array.isRequired,
  pepiteId: PropTypes.number.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(CommitteePage)
