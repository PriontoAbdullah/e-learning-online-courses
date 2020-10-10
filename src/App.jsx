import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';
import About from './components/About';
import Cart from './components/Cart';
import Contact from './components/Contact';
import Courses from './components/Courses';
import Home from './components/Home';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
    
      <Navbar />

      <Switch>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/courses">
          <Courses />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Redirect to="/">
          <Home />
        </Redirect>
      </Switch>

  </Router>
  );
}

export default App;
