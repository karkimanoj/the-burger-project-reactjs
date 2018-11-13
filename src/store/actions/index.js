import * as actionTypes from './actionTypes';

export function fetchIngredients() {
	return null;
}

export function addIngredient(ingredientName) {
	return { 
		type : actionTypes.ADD_INGREDIENT,
		ingredientName : ingredientName
	};
}

export function removeIngredient(ingredientName) {
	return { 
			type : actionTypes.REMOVE_INGREDIENT, 
			ingredientName : ingredientName 
	};
}