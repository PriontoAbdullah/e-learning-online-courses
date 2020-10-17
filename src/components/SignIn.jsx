import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework,  handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from './SigninManager';

const SignIn = () => {
	const [ newUser, setNewUser ] = useState(false);
	const [ user, setUser ] = useState({
		isSignedIn: false,
		name: '',
		email: '',
		password: '',
		photo: ''
	});

	initializeLoginFramework();

	// Use Context API
	const [ loggedInUser, setLoggedInUser ] = useContext(UserContext);
	// redirect after login
	const history = useHistory();
	const location = useLocation();
	let { from } = location.state  || { from: { pathname: '/' } };

	console.log(location.state);

	const handleResponse = (res, redirect) => {
		setUser(res);
		setLoggedInUser(res);
		if(redirect){
			history.replace(from);
		}
	}

	const googleSignIn = () => {
		handleGoogleSignIn()
		.then(res => {
			handleResponse(res, true);
		})
	}

	const fbSignIn = () => {
		handleFbSignIn()
		.then(res => {
			handleResponse(res, true);
		})
	}

	const signOut = () => {
		handleSignOut()
		.then(res => {
			handleResponse(res, false);
		})
	}

	const handleBlur = (e) => {
		let isFieldValid = true;
		if (e.target.name === 'email') {
			isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
		}
		if (e.target.name === 'password') {
			const isPasswordValid = e.target.value.length > 6;
			const passwordHasNumber = /\d{1}/.test(e.target.value);
			isFieldValid = isPasswordValid && passwordHasNumber;
		}
		if (isFieldValid) {
			const newUserInfo = { ...user };
			newUserInfo[e.target.name] = e.target.value;
			setUser(newUserInfo);
		}
	};

	const handleSubmit = (e) => {
		if (newUser && user.email && user.password) {
			createUserWithEmailAndPassword(user.name, user.email, user.password)
			.then((res) => {
				handleResponse(res, true);
			})
		}

		if (!newUser && user.email && user.password) {
			signInWithEmailAndPassword(user.email, user.password)
			.then((res) => {
				handleResponse(res, true);
			})
		}

		e.preventDefault();
	};

	

	return (
		<div className="container-fluid">
			<div className="row justify-content-md-center">
				<div className="col-md-4">
					<div className="text-center py-5">
						{user.isSignedIn ? (
							<button className="btn btn-danger" onClick={signOut}>
								Sign Out
							</button>
						) : (
							<div>
								<button className="btn btn-success my-2 mx-5" onClick={googleSignIn}>
									Sign In With Google
								</button>

								<button className="btn btn-primary my-2" onClick={fbSignIn}>
									Sign In With Facebook
								</button>
							</div>
						)}

						{user.isSignedIn && (
							<div className="py-5 lead">
								<p>Welcome, {user.name}!</p>
								<p>Your email: {user.email}</p>
								<img src={user.photo} alt="user_Photo" />
							</div>
						)}

						<h1 className="py-4 lead">Our own Authentication</h1>

						<div className="my-2">
							<input
								type="checkbox"
								className="form-check-input mx-2"
								onChange={() => setNewUser(!newUser)}
								name="newUser"
								id=""
							/>
							<label htmlFor="newUser" className="form-check-label text-secondary ">
								New User Sign up
							</label>
						</div>

						<form onSubmit={handleSubmit}>
							{newUser && (
								<input
									name="name"
									className="form-control py-1"
									type="text"
									onBlur={handleBlur}
									placeholder="Your name"
								/>
							)}
							<br />
							<input
								type="text"
								name="email"
								className="form-control py-1"
								onBlur={handleBlur}
								placeholder="Your Email address"
								required
							/>
							<br />
							<input
								type="password"
								name="password"
								className="form-control py-1"
								onBlur={handleBlur}
								placeholder="Your Password"
								required
							/>
							<br />
							<input
								type="submit"
								className="btn btn-info py-1 px-5"
								value={newUser ? 'Sign up' : 'Sign in'}
							/>
						</form>

						<p style={{ color: 'red' }}>{user.error}</p>
						{user.success && (
							<p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
