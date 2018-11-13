import * as actionTypes from '../actions/actionTypes';

const initialState = {
	ingredients : {
		salad : { quantity: 0, unitPrice : 0.5},
		cheese : { quantity: 0, unitPrice : 0.6},
		bacon : { quantity: 0, unitPrice : 0.6},				
		meat : { quantity: 0, unitPrice : 0.7}
	},
	totalPrice : 4
};

export default function (state = initialState, action) { 
	switch (action.type) { 
		case actionTypes.ADD_INGREDIENT: console.log('gg',action.ingredientName)
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
		default :
			return state;	
	}
	
}