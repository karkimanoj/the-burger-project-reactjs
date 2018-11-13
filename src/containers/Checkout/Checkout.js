import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from './ContactForm/ContactForm';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

class Checkout extends Component {
	constructor (props) {
		super(props);
		this.onCheckoutContinue = this.onCheckoutContinue.bind(this);
		this.onCheckoutCancel = this.onCheckoutCancel.bind(this);
	}
	
	
	onCheckoutContinue () {
		this.props.history.replace('/checkout/contact-form');
	}

	onCheckoutCancel () {
		this.props.history.goBack();
	}

	render () {
		const ingredients = {...this.props.ingredients};
		let optIngredients = {};
		
		for(let key in ingredients)
			optIngredients[key] = ingredients[key].quantity;

		return (
			<div>
				<CheckoutSummary 
				ingredients={optIngredients}
				checkoutContinued ={this.onCheckoutContinue}
				checkoutCancelled ={this.onCheckoutCancel}
				/>
				<Route path={this.props.match.path + '/contact-form'} 
					render={() => 
						<ContactForm 
							history={this.props.history}/>
				}/>	
			</div>
			
		);
	}
}

const mapStateToProps = ({burger}) => ({
	ingredients : burger.ingredients
})

export default connect(mapStateToProps)(Checkout);