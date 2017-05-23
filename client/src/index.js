import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import configureStore from './store/configureStore'
import configure from './configure'
import {Provider} from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import './styles/styles.css'
import './styles/prog-tracker.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootswatch/flatly/bootstrap.min.css'
import './styles/beta-ribbon.css'
import '../node_modules/toastr/build/toastr.min.css'

const store = configureStore()
configure()

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
)
