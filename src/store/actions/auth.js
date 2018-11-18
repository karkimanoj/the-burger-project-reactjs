import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authenticateUser = (email, password, isSignUp) => {
	const authData ={
		email : email,
		password : password,
		returnSecureToken : true
	};

	let URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCh4i2zHIUVywR-gPkQ6g2_4GLzsJsNdkA';
	if(!isSignUp)
		URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCh4i2zHIUVywR-gPkQ6g2_4GLzsJsNdkA';
	
	return dispatch => {
		dispatch(authStart()); 

		axios.post(URL, authData)
		.then(response => {			
			dispatch(authSuccess(response.data));

			const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000)
			localStorage.setItem('idToken', response.data.idToken);
			localStorage.setItem('expirationDate', expirationDate);
			localStorage.setItem('localId', response.data.localId);	
			localStorage.setItem('email', response.data.email);		

			return Promise.resolve(response.data.expiresIn);
		})
		.then(expiresIn => {
			dispatch(checkAuthTimeout(expiresIn));
			//console.log('expiresIn', expiresIn);
		})
		.catch(errorbag => {
			dispatch(authFailed(errorbag.response.data.error.message));
		});  
	} 
}

export const authStart = () => {
	return {
		type : actionTypes.AUTH_START
	};
}

export const authSuccess = (data) => {

	return {
		type : actionTypes.AUTH_SUCCESS,
		idToken : data.idToken,
		localId :data.localId,
		email : data.email 
	};
}

export const authFailed = (error) => {
	return {
		type : actionTypes.AUTH_FAILED,
		error 
	};
}

export const checkAuthTimeout = (expiresIn) => {
	return dispatch => {
		//converting expiresIn from seconds to misiseconds
		setTimeout(() => dispatch(authLogout()), expiresIn * 1000);
	}
}

export const authLogout = () => {
	localStorage.removeItem('idToken');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('localId');
	localStorage.removeItem('email');		
	return {
		type : actionTypes.AUTH_LOGOUT
	}
}

export const authCheckState = () => {
	return dispatch => {
		const idToken = localStorage.getItem('idToken');
		const expirationDate = new Date(localStorage.getItem('expirationDate'));
		const localId = localStorage.getItem('localId');
		const email = localStorage.getItem('email');		
		const data = {idToken, localId, email};

		if(idToken && expirationDate >= new Date())
		{
			dispatch(authSuccess(data));
			//converting miliseconds to seconds
			dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
			
		} else
			dispatch(authLogout());
	}
};