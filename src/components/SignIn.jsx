import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../firebase.config';

firebase.initializeApp(firebaseConfig);

const SignIn = () => {
	const [ newUser, setNewUser ] = useState(false);
	const [ user, setUser ] = useState({
		isSignedIn: false,
		name: '',
		email: '',
		password: '',
		photo: ''
	});

	const googleProvider = new firebase.auth.GoogleAuthProvider();
	const fbProvider = new firebase.auth.FacebookAuthProvider();

	const handleSignIn = () => {
		firebase
			.auth()
			.signInWithPopup(googleProvider)
			.then((res) => {
				const { displayName, photoURL, email } = res.user;
				const signedInUser = {
					isSignedIn: true,
					name: displayName,
					email: email,
					photo: photoURL
				};
				console.log(res.user);
				setUser(signedInUser);
			})
			.catch((err) => {
				console.log(err);
				console.log(err.message);
			});
	};

	const handleFbSignIn = () => {
		firebase
			.auth()
			.signInWithPopup(fbProvider)
			.then((res) => {
				var token = res.credential.accessToken;

				const { displayName, photoURL, email } = res.user;
				const signedInUser = {
					isSignedIn: true,
					name: displayName,
					email: email,
					photo: photoURL
				};
				console.log(res.user);
				setUser(signedInUser);
			})
			.catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	};

	const handleSignOut = () => {
		firebase
			.auth()
			.signOut()
			.then((res) => {
				const signedOutUser = {
					isSignedIn: false,
					name: '',
					email: '',
					photo: '',
					error: '',
					success: false
				};
				setUser(signedOutUser);
			})
			.catch((err) => {
				console.log(err);
			});
	};

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
			firebase
				.auth()
				.createUserWithEmailAndPassword(user.email, user.password)
				.then((res) => {
					const newUserInfo = { ...user };
					newUserInfo.error = '';
					newUserInfo.success = true;
					setUser(newUserInfo);
					updateUserName(user.name);
				})
				.catch((error) => {
					const newUserInfo = { ...user };
					newUserInfo.error = error.message;
					newUserInfo.success = false;
					setUser(newUserInfo);
				});
		}

		if (!newUser && user.email && user.password) {
			firebase
				.auth()
				.signInWithEmailAndPassword(user.email, user.password)
				.then((res) => {
					const newUserInfo = { ...user };
					newUserInfo.error = '';
					newUserInfo.success = true;
					setUser(newUserInfo);
					console.log('sign in user info', res.user);
				})
				.catch(function(error) {
					const newUserInfo = { ...user };
					newUserInfo.error = error.message;
					newUserInfo.success = false;
					setUser(newUserInfo);
				});
		}

		e.preventDefault();
	};

	const updateUserName = (name) => {
		const user = firebase.auth().currentUser;

		user
			.updateProfile({
				displayName: name
			})
			.then(function() {
				console.log('user name updated successfully');
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	return (
		<div className="container-fluid">
			<div className="row justify-content-md-center">
				<div className="col-md-4">
					<div className="text-center py-5">
						{user.isSignedIn ? (
							<button className="btn btn-danger" onClick={handleSignOut}>
								Sign Out
							</button>
						) : (
							<div>
								<button className="btn btn-success my-2 mx-5" onClick={handleSignIn}>
									Sign In With Google
								</button>
							
								<button className="btn btn-primary my-2" onClick={handleFbSignIn}>
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
