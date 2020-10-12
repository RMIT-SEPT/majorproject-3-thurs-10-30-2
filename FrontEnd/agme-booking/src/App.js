import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header'
import Hero from './Components/Homepage/Hero';
import Dashboard from './Components/Dashboard/Dashboard';
import AdminView from './Components/Dashboard/AdminView';
import { PrivateRoute } from './Components/PrivateRoute';


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import WorkerDash from './Components/Dashboard/Worker/WorkerDash';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            <Hero />
          </Route>
          <PrivateRoute path="/dashboard" component={<Dashboard />} userType="CUSTOMER"/>
          <PrivateRoute path="/admin" component={<AdminView />} userType="ADMIN"/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
