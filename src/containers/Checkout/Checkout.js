import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from './ContactForm/ContactForm';
import {Route} from 'react-router-dom';

class Checkout extends Component {
	constructor (props) {
		super(props);
		this.state = {
			ingredients : null,
			totalPrice : 0	
		};

		this.onCheckoutContinue = this.onCheckoutContinue.bind(this);
		this.onCheckoutCancel = this.onCheckoutCancel.bind(this);
	}
	
	componentWillMount () {

		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let totalPrice = 0;
		for(let param of query) {
			if(param[0] === 'totalPrice')
				totalPrice = param[1];
			else
				ingredients[param[0]] =  +param[1];
		}
		/* if this does not work , use 
		ingredients[param[0]] = { quantity : +param[1], unitPrice : 0.5};
		console.log(ingredients);
		*/
		this.setState({ingredients :  ingredients, totalPrice : +totalPrice});
		
	}
	
	onCheckoutContinue () {
		this.props.history.replace('/checkout/contact-form');
	}

	onCheckoutCancel () {
		this.props.history.goBack();
	}

	render () {
	
		return (
			<div>
				<CheckoutSummary 
				ingredients={this.state.ingredients}
				checkoutContinued ={this.onCheckoutContinue}
				checkoutCancelled ={this.onCheckoutCancel}
				/>
				<Route path={this.props.match.path + '/contact-form'} 
					render={() => 
						<ContactForm 
							ingredients={this.state.ingredients} 
							totalPrice={this.state.totalPrice}
							history={this.props.history}/>
				}/>	
			</div>
			
		);
	}
}

export default Checkout;