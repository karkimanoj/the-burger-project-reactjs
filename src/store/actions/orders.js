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
	return dispatch => {
		dispatch(orderBurgerStart());

		axios.post('/orders.json', order
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
	return { type : actionTypes.FETCH_INGREDIENTS_FAILED }
}

export function fetchOrdersSuccess(orders) {
	return {
		type : actionTypes.FETCH_INGREDIENTS_SUCCESS,
		orders : orders
	};
}

export function fetchOrders() {
	return dispatch => {
		axios.get('orders.json')
		.then( response => 
			dispatch(fetchOrdersSuccess(response.data))
		).then( error => 
			dispatch(fetchOrdersFailed())
		);
	}
}