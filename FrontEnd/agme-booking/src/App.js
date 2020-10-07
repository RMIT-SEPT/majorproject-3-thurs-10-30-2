import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header'
import Hero from './Components/Homepage/Hero';
import Dashboard from './Components/Dashboard/Dashboard';
import AdminView from './Components/Dashboard/AdminView';


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            <Hero />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/admin">
            <AdminView />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
