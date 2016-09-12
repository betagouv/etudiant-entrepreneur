import React, {PropTypes} from 'react'
import Header from './common/Header.js'

class App extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div className="container">
        <Header/>
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
}

export default App
