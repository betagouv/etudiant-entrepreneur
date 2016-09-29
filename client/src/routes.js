import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import HomePage from './components/home/HomePage'
import ApplicationPage from './components/application/ApplicationPage'
import PrintPage from './components/application/PrintPage'
import NotFound from './components/error/NotFound'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="application/:id/print" component={PrintPage}/>
    <Route path="application(/:id)" component={ApplicationPage}/>
    <Route path="*" component={NotFound} />
  </Route>
)
