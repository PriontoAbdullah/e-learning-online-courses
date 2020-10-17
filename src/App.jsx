import React, { useState, createContext } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Cart from './components/Cart';
import Contact from './components/Contact';
import Courses from './components/Courses';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import Shipment from './components/Shipment';
import PrivateRoute from './components/PrivateRoute';

// Create Context API
export const UserContext = createContext();

const App = () => {
	const [ loggedInUser, setLoggedInUser ] = useState({});
	const [ cart, setCart ] = useState([]);

	const addToCart = (courses) => {
		const newCart = [ ...cart, courses ];
		setCart(newCart);
	};

	return (
		<UserContext.Provider value={[ loggedInUser, setLoggedInUser ]}>
			<Router>
				<Navbar cart={cart} />

				<Switch>
					<Route exact path="/about">
						<About />
					</Route>
					<Route exact path="/contact">
						<Contact />
					</Route>
					<Route exact path="/courses">
						<Courses addToCart={addToCart} />
					</Route>
					<Route exact path="/cart">
						<Cart cart={cart} />
					</Route>
          <PrivateRoute exact path="/shipment">
						<Shipment />
					</PrivateRoute>
					<Route exact path="/signin">
						<SignIn />
					</Route>
					<Route exact path="/">
						<Home />
					</Route>
					<Redirect to="/">
						<Home />
					</Redirect>
				</Switch>

				<Footer />
			</Router>
    <p className="py-3 lead">User Login as {loggedInUser.email}</p>
		</UserContext.Provider>
	);
};

export default App;
