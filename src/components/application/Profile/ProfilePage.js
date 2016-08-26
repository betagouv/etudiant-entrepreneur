import React, {PropTypes} from 'react'

class ProfilePage extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <form>
        <p>Mon Profil</p>
        <div>Ici, je fournis bientôt les informations basiques sur mon identité.</div>
      </form>
    )
  }
}

export default ProfilePage
