import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../firebase.config';

export const initializeLoginFramework = () => {
	if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
};

export const handleGoogleSignIn = () => {
	const googleProvider = new firebase.auth.GoogleAuthProvider();
	return firebase
		.auth()
		.signInWithPopup(googleProvider)
		.then((res) => {
			const { displayName, photoURL, email } = res.user;
			const signedInUser = {
				isSignedIn: true,
				name: displayName,
				email: email,
                photo: photoURL,
                success: true
			};
			console.log(res.user);
			return signedInUser;
		})
		.catch((err) => {
			console.log(err);
			console.log(err.message);
		});
};

export const handleFbSignIn = () => {
	const fbProvider = new firebase.auth.FacebookAuthProvider();
	return firebase
		.auth()
		.signInWithPopup(fbProvider)
		.then((res) => {
			var token = res.credential.accessToken;

			const { displayName, photoURL, email } = res.user;
			const signedInUser = {
				isSignedIn: true,
				name: displayName,
				email: email,
                photo: photoURL,
                success: true
			};
			console.log(res.user);
			return signedInUser;
		})
		.catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorCode, errorMessage);
		});
};

export const handleSignOut = () => {
	return firebase
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
			return signedOutUser;
		})
		.catch((err) => {
			console.log(err);
		});
};

export const createUserWithEmailAndPassword = (name, email, password) => {
	return firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then((res) => {
			const newUserInfo = res.user;
			newUserInfo.error = '';
			newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;
		})
		.catch((error) => {
			const newUserInfo = {};
			newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
		});
};

export const signInWithEmailAndPassword = (email, password) => {
	return firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((res) => {
			const newUserInfo = res.user;
			newUserInfo.error = '';
			newUserInfo.success = true;
			return newUserInfo;
		})
		.catch(function(error) {
			const newUserInfo = {};
			newUserInfo.error = error.message;
			newUserInfo.success = false;
			return newUserInfo;
		});
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

const SigninManager = () => {
	return <div />;
};

export default SigninManager;
