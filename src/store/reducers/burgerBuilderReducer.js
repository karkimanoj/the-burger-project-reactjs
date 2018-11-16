import * as actionTypes from '../actions/actionTypes';

const initialState = {
	ingredients : null, /*{
		salad : { quantity: 0, unitPrice : 0.5},
		cheese : { quantity: 0, unitPrice : 0.6},
		bacon : { quantity: 0, unitPrice : 0.6},				
		meat : { quantity: 0, unitPrice : 0.7}
	}*/
	totalPrice : 4,
	error : false
};

export default function (state = initialState, action) { 
	switch (action.type) { 
		case actionTypes.ADD_INGREDIENT: 
			return { 
				...state,
				ingredients : {
					...state.ingredients,
					[action.ingredientName] : {
						...state.ingredients[action.ingredientName] ,
						quantity : state.ingredients[action.ingredientName].quantity + 1
					}
				},
				totalPrice : state.totalPrice + state.ingredients[action.ingredientName].unitPrice  
			};
		case actionTypes.REMOVE_INGREDIENT:
			return { 
				...state,
				ingredients : {
					...state.ingredients,
					[action.ingredientName] : {
						...state.ingredients[action.ingredientName],
						quantity : state.ingredients[action.ingredientName].quantity - 1
					}
				},
				totalPrice : state.totalPrice - state.ingredients[action.ingredientName].unitPrice
			};	
		case actionTypes.SET_INGREDIENTS :
			return {
				...state,
				ingredients : action.ingredients,
				totalPrice : 4
			};
		case actionTypes.SET_INGREDIENTS_FAILED :
			return {
				...state,
				error : true
			};	
		default :
			return state;	
	}
	
}