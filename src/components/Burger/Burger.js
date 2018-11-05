import React from 'react';
import _ from 'lodash';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = ({ingredients}) => {
	
	let ingredientList = _.keys(ingredients).map(ingredient => {
		return [...new Array(ingredients[ingredient])]
			.map( (_, index) => <BurgerIngredient key={ingredient+index} type={ingredient}/> );			
	}).reduce((array, el) => array.concat(el), []); 
	//console.log(_.keys(ingredients))
	if(ingredientList.length === 0) 
		ingredientList = <h4> Please start adding ingrediants! </h4>;

	return (
		<div className='row' >
			<div className='col-md-6 offset-md-3 burger'>
			
				<BurgerIngredient type='bread-top' />
				{ingredientList}
				<BurgerIngredient type='bread-bottom' />
				{/* 
				
				<BurgerIngredient type='cheese' />
				<BurgerIngredient type='meat' />
				*/}
		
			</div>
		</div>		
	);
}

export default Burger;