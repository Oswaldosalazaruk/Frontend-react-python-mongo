
import React, {Fragment} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'bootswatch/dist/lux/bootstrap.css';
import About from './components/About';
import Users from './components/Users';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className="container p-4">
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Users />
          </Route>
        </Switch>
        </div>
      </Fragment>
    </Router>
  );
}



    

