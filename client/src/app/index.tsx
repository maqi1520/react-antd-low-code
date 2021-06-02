import React from 'react'
import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom'
import Editor from '../pages/editor'
import Home from '../pages/home'
import Login from '../pages/login'
import Register from '../pages/register'
import { Provider } from 'react-redux'
import PrivateRoute from './PrivateRoute'
import store from './store'
import Project from '../pages/project'
import Layout from '/~/components/Layout'

type TypeRouter = typeof BrowserRouter

const Router: TypeRouter =
  process.env.NODE_ENV === 'production' ? BrowserRouter : HashRouter

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/editor" component={Editor} />
            <PrivateRoute path="/project" component={Project} />
            <Route path="/" component={Home} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  )
}
