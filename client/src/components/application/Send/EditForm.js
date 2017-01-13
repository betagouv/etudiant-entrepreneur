import React, {PropTypes} from 'react'
import { Panel, Button } from 'react-bootstrap'

const EditForm = ({editForm}) => {
  return (
    <form>
      <Button bsStyle="success" onClick={editForm}>Modifier ma candidature</Button>
    </form>
  )
}

EditForm.propTypes = {
  editForm: PropTypes.func.isRequired,
}

export default EditForm
