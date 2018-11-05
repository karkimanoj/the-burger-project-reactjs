import React, {Fragment, Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';


class BurgerBuilder extends Component {

	constructor (props){
		super(props);
		this.state = {
			ingredients : null/*{
				salad : { quantity: 0, unitPrice : 0.5},
				cheese : { quantity: 0, unitPrice : 0.6},
				bacon : { quantity: 0, unitPrice : 0.6},				
				meat : { quantity: 0, unitPrice : 0.7}
			}*/,
			totalPrice : 4,
			purchasing : false,
			loading :false,
			error : false
		};
		this.onIngredientAdd = this.onIngredientAdd.bind(this);
		this.onIngredientRemove = this.onIngredientRemove.bind(this);
		this.handlePurchase = this.handlePurchase.bind(this);
		this.handleContinuePurchase = this.handleContinuePurchase.bind(this);
		
	}
	
	componentWillMount () {
		axios.get('/ingredients.json')
			.then(response => {
				
				this.setState({ingredients : response.data});
			})
			.catch( error => {
				this.setState({error : true});
			});
	}

	onIngredientAdd (type) {		
		let {ingredients, totalPrice} = this.state;
		ingredients[type].quantity++;	totalPrice += ingredients[type].unitPrice;

		this.setState({
			ingredients : ingredients,
			totalPrice : totalPrice 
		});
	}

	onIngredientRemove (type) {
		let {ingredients, totalPrice} = this.state;
		ingredients[type].quantity--;	totalPrice -= ingredients[type].unitPrice;

		this.setState({
			ingredients : ingredients,
			totalPrice : totalPrice 
		});
	}

	handlePurchase (purchase) {
		this.setState({purchasing : purchase});
	}

	handleContinuePurchase () {
		
		const {ingredients} = this.state;
		let queryParams = Object.keys(ingredients).map( ingredient => 
			encodeURIComponent(ingredient) + '=' + encodeURIComponent(ingredients[ingredient].quantity)
		);
		queryParams.push('totalPrice=' + encodeURIComponent(this.state.totalPrice));
		const queryString = queryParams.join('&');
		this.props.history.push({
			pathname : '/checkout',
			search : '?' + queryString
		});
		//console.log(queryParams.join('&'))
	}

	render () {
		const rowstyle={ margin : 0};
		const {ingredients} = this.state;
		const optIngredients = {};
		
		for(let key in ingredients)
			optIngredients[key] = ingredients[key].quantity;
		
		let orderSummary = null;		
		let burgerInterface = <Spinner />;
		
		if (this.state.error) 
			burgerInterface = <center> <h1 className='mt-5 text-danger'> 
				Ingredients loading failed! 
			</h1></center>;
		else
		{
			if(ingredients) {
				burgerInterface = (
					<Fragment>
						<div className='col-md-12'>
							<Burger ingredients={optIngredients} />
						</div>
						<div className='w-100'></div>
						<div className='col-md-12'>
							<BurgerControls ingredients={optIngredients}
							addIngredient={this.onIngredientAdd} 
							removeIngredient={this.onIngredientRemove}
							totalPrice={this.state.totalPrice} 
							handlePurchase={this.handlePurchase}/>	
						</div>
					</Fragment>
				);
				orderSummary = <OrderSummary  
					purchaseCanceled={this.handlePurchase}  
					orderDetails={optIngredients}
					purchaseContiued={this.handleContinuePurchase}
					totalPrice={this.state.totalPrice} />;
			}
		}
		if(this.state.loading) orderSummary = <Spinner />;		

		return(
			<div className='row' style={rowstyle}>
				<Modal show={this.state.purchasing} modalClose={this.handlePurchase}>
					{orderSummary}
				</Modal>
				 {burgerInterface}
			
			</div>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);   