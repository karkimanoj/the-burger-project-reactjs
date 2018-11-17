import * as actionTypes from '../actions/actionTypes';

const initialState = {
	orders : null,
	ordering : false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ORDER_BURGER_START :
			return {
				...state,
				ordering : true
			};
		case actionTypes.ORDER_BURGER_SUCCESS :
		case actionTypes.ORDER_BURGER_FAILED :
			return {
				...state,
				ordering : false
			};	
		case actionTypes.FETCH_ORDERS_SUCCESS :
			return {
				...state,
				orders : action.orders
			};
		//case actionTypes.FETCH_INGREDIENTS_FAILED :

		default :
			return state;
	}
}
