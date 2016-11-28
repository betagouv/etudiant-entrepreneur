import React, {PropTypes} from 'react'
import Header from './header/Header.js'

class App extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div className="container fill">
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
