import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'

const conditionAddMember = ComposedComponent => {
  class ConditionedAddMemberComponent extends React.Component {
    constructor(props, context) {
      super(props, context)
      this.state = { canAddMember: this.props.team.length != 0 }
      this.addMember = this.addMember.bind(this)
    }

    addMember(event) {
      event.preventDefault()
      this.setState({ canAddMember: true })
    }

    render() {
      if (this.state.canAddMember) {
        return (<ComposedComponent {...this.props}/>)
      }
      else {
        return (<Button bsStyle="primary" className="add-members" onClick={this.addMember}><span className="glyphicon glyphicon-plus"></span> J'ajoute des membres à mon projet</Button>)
      }
    }
  }

  ConditionedAddMemberComponent.propTypes = {
    team: PropTypes.array.isRequired,
  }

  return ConditionedAddMemberComponent
}

export default conditionAddMember
