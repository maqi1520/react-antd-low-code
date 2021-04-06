import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Editor from '../pages/editor'
import Home from '../pages/home'
import Login from '../pages/login'
import { Provider } from 'react-redux'
import store from './store'

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/editor" component={Editor} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Provider>
  )
}
