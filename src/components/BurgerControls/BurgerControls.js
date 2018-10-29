import React from 'react';
import _ from 'lodash';

const BurgerControl = ({type, addIngredient, removeIngredient, disabled}) => {
	return (
		<div className="form-group row">
		    <label className="col-sm-2 col-form-label font-weight-bold">{type}</label>
		    <div className="col-sm-5">
				<button className="form-control btn btn-outline-light"
				onClick={()=>removeIngredient(type)} disabled={disabled}> less </button>
		    </div>
		    <div className="col-sm-5">
				<button className="form-control btn btn-success" onClick={()=>addIngredient(type)}>
				more </button>
		    </div>
		</div>
	);
}

const BurgerControls = 
({addIngredient, removeIngredient,  totalPrice, ingredients, handlePurchase}) => {
	const ingredientsArray=_.keys(ingredients);
	const sum = ingredientsArray.map( ingredient => ingredients[ingredient].quantity)
			.reduce((sum, el) => sum+=el, 0); 
			
	
	return (
	
		<div className='row mt-4 burger-controls-bg-color'>
			<div className='col-md-8 offset-md-2 p-4 text-center'>
				<p> Total Price : <strong> {totalPrice.toFixed(2)} </strong> </p>
				
				{ ingredientsArray.map( (ingredient, i) => 
					<BurgerControl key={ingredient+i} type={ingredient} 
					disabled={ingredients[ingredient].quantity <= 0}
					addIngredient = {addIngredient} 
					removeIngredient = {removeIngredient}/>	
				)}
				<button className='bn btn-light btn-lg' 
					disabled={sum <= 0} 
					onClick={() => handlePurchase(true)}> 
					Order 
				</button>
			</div>
		</div>	
	
	);
}

export default BurgerControls;