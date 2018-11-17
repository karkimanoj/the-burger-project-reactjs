import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export function orderBurgerStart() {
	return {
		type : actionTypes.ORDER_BURGER_START
	};
}

export function orderBurgerSuccess() {
	return {
		type : actionTypes.ORDER_BURGER_SUCCESS,
	};
}

export function orderBurgerFailed() {
	return {
		type : actionTypes.ORDER_BURGER_FAILED
	};
}

export function orderBurgerInit(order, successCallback) {
	return (dispatch, getState) => {

		const {idToken} = getState().auth;
		dispatch(orderBurgerStart());

		axios.post('/orders.json?auth='+idToken, order
		).then( response => {
			console.log(response)
			dispatch(orderBurgerSuccess())			
		}).then( 
			() => successCallback()
		).catch( error => {
			dispatch(orderBurgerFailed());
		});
	}
}

export function fetchOrdersFailed() {
	return { type : actionTypes.FETCH_ORDERS_FAILED }
}

export function fetchOrdersSuccess(orders) {
	return {
		type : actionTypes.FETCH_ORDERS_SUCCESS,
		orders
	};
}

export function fetchOrders() {
	return (dispatch, getState) => {
		const {idToken} = getState().auth;
		
		axios.get('/orders.json?auth='+idToken)
		.then( response => 
			dispatch(fetchOrdersSuccess(response.data))
		).catch( error => 
			dispatch(fetchOrdersFailed())
		);
	}
}