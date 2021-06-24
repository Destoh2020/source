import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Students from './components/Students';
import Teachers from './components/Teachers';
import WindowsNavBar from './components/WindowsNavBar';
import { userId } from './store/slices/appSlice';

function PrivateRoute({ component: Component, ...rest }: RouteProps) {
  const loggedUserId = useSelector(userId);
  const electron = window.require ? window.require('@electron/remote') : null;
  if (!Component) {
    return null;
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        const isAuthenticated = loggedUserId ? true : false;
        return isAuthenticated ? (
          <div>
            <div>
              {electron ? <WindowsNavBar /> : null}
              <Navbar />
              <Component {...props} />
            </div>
          </div>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
}

function App() {
  return (
    <div
      className='container-fluid'
      style={{ paddingLeft: 0, paddingRight: 0 }}
    >
      <Router>
        <Switch>
          <PrivateRoute exact path='/' component={Home} />
          <PrivateRoute path='/teachers' component={Teachers} />
          <PrivateRoute path='/students' component={Students} />
          <Route path='/login' component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
