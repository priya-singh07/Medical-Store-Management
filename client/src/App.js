import React from 'react'
import './App.css'
import { Switch, Route, BrowserRouter as Router, Redirect, useLocation } from 'react-router-dom'
import { routes } from './Routes';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import 'bootstrap/dist/css/bootstrap.min.css'
import AlertTemplate from 'react-alert-template-basic'
import ScrollToTop from './components/scrollbar'
import AuthContextProvider, { useAuth } from './contexts/AuthContext';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 3500,
  offset: "50px",
  texttransform: "lowercase",
  transition: transitions.SCALE,
};

function App() {

  const getRoutes = (routes) => {
    return (
      routes.map((route, key) => (
        <ProtectedRoute exact path={route.path} key={key} component={route.component} />
      )
      ))
  }

  return (
    <AuthContextProvider>
    <AlertProvider template={AlertTemplate} {...options}>
      <Router>
        <ScrollToTop />
        <Switch>
          <Redirect from="/logout" to="/" />
          {getRoutes(routes)}
        </Switch>
      </Router>
    </AlertProvider>
    </AuthContextProvider>
  );
}

export default App;

function ProtectedRoute(props) {
  const { currentUser } = useAuth()
  const { path } = props
  const location = useLocation()

  if (
    path === '/login' ||
    path === '/register' ||
    path === '/forgot-password' ||
    path === '/reset-password' ||
    path === '/'
  ) {
    return currentUser ? (
      <Redirect to={location.state?.from ?? '/dashboard'} />
    ) : (
      <Route {...props} />
    )
  }
  return currentUser ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: path },
      }}
    />
  )
}