import React, {Fragment, Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import {addIngredient, removeIngredient} from '../../store/actions';


class BurgerBuilder extends Component {

	constructor (props){
		super(props);
		this.state = {
			purchasing : false,
			//loading :false,
			error : false
		};

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

	handlePurchase (purchase) {
		this.setState({purchasing : purchase});
	}

	handleContinuePurchase () {
		this.props.history.push({
			pathname : '/checkout',
		});
	}

	render () {  

		const {ingredients, totalPrice} = this.props;
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
							addIngredient={this.props.addIngredient} 
							removeIngredient={this.props.removeIngredient}
							totalPrice={totalPrice} 
							handlePurchase={this.handlePurchase}/>	
						</div>
					</Fragment>
				);
				orderSummary = <OrderSummary  
					purchaseCanceled={this.handlePurchase}  
					orderDetails={optIngredients}
					purchaseContiued={this.handleContinuePurchase}
					totalPrice={totalPrice} />;
			}
		}
		//if(this.state.loading) orderSummary = <Spinner />;		

		return(
			<div className='row' style={{margin : 0}}>
				<Modal show={this.state.purchasing} modalClose={this.handlePurchase}>
					{orderSummary}
				</Modal>
				 {burgerInterface}
			</div>
		);
	}
}

const mapStateToProps = ({burger}) => ({
	ingredients : burger.ingredients,
	totalPrice : burger.totalPrice
});

export default 
	connect(mapStateToProps, {addIngredient, removeIngredient})(withErrorHandler(BurgerBuilder, axios));   