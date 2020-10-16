import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
	return (
		<div className="container-fluid nav_bg">
			<div className="row">
				<div className="col-10 mx-auto">
					<nav className="navbar navbar-expand-lg navbar-light">
						<div className="container-fluid">
							<NavLink className="navbar-brand" to="/">
								e-Learning
							</NavLink>
							<button
								className="navbar-toggler"
								type="button"
								data-toggle="collapse"
								data-target="#navbarNavDropdown"
								aria-controls="navbarNavDropdown"
								aria-expanded="false"
								aria-label="Toggle navigation"
							>
								<span className="navbar-toggler-icon" />
							</button>
							<div className="collapse navbar-collapse" id="navbarNavDropdown">
								<ul className="navbar-nav mb-2 mb-lg-0 ml-auto">
									<li className="nav-item">
										<NavLink exact className="nav-link" to="/" activeClassName="menu_active">
											Home
										</NavLink>
									</li>
									<li className="nav-item">
										<NavLink className="nav-link" to="/about" activeClassName="menu_active">
											About
										</NavLink>
									</li>
									<li className="nav-item">
										<NavLink className="nav-link" to="/courses" activeClassName="menu_active">
											Courses
										</NavLink>
									</li>
									<li className="nav-item">
										<NavLink className="nav-link" to="/cart" activeClassName="menu_active">
											Cart <span className="text-light bg-dark p-1 cart-span">{props.cart.length}</span>
										</NavLink>
									</li>
									<li className="nav-item">
										<NavLink className="nav-link" to="/contact" activeClassName="menu_active">
											Contact
										</NavLink>
									</li>
									<li className="nav-item">
										<NavLink className="nav-link" to="/signin" activeClassName="menu_active">
											Sign in
										</NavLink>
									</li>
								</ul>
							</div>
						</div>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
