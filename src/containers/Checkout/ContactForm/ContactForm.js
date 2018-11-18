import React, {Component} from 'react';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {orderBurgerInit} from '../../../store/actions';
import withErrorHandler from '../../../HOC/withErrorHandler/withErrorHandler';
import getOptimizedIngredients from '../../../utils/getOptimizedIngredients';

const schema = Yup.object().shape({
				name: Yup.string().required().min(3).max(254),
				email: Yup.string().required().email(),
				street: Yup.string().required().min(2).max(254),
				zipCode: Yup.string().required(), 
				country: Yup.string().required().max(254),
				deliveryMethod : Yup.string().required()
			});

class ContactForm extends Component {
	
	constructor (props) {
		super(props);
		this.state = {
			orderForm : {
				name : '',
				email : '',
				street : '',
				zipCode : '',
				country : '',
				deliveryMethod : 'cheapest',
			},
			touched : {
				name : false,
				email : false,
				street : false,
				zipCode : false,
				country : false,
				deliveryMethod : false
			},
			validationErrors : null,
			
		}
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onInputchange = this.onInputchange.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.onInputBlur = this.onInputBlur.bind(this);
		
	}
/*
	componentDidMount() {
		this.validateForm(this.state.orderForm);
	}	*/

	onInputchange (e) {

		const {name, value} = e.target;
		let {orderForm, touched} = this.state;
		orderForm[name] = value;
		touched[name] = true;
		this.setState({ orderForm , touched }) ;
		//calling validateForm method with the updated object 
			//instead of retreiving this.state.orderForm inside validateForm method 
			//as we will get old orderForm state even after setingState with function 
		this.validateForm();
	}

	onInputBlur (e) {
		const {name} = e.target;
		this.setState(prevState => {
			prevState.touched[name] = true;
			return { touched : prevState.touched} ;
		});
		this.validateForm();
	}

	validateForm () {
		schema.validate(this.state.orderForm , { abortEarly: false })
			.then( () =>  this.setState({validationErrors : null}))
			.catch(errors => {
				let validationErrors = {};
				for(let error of  errors.inner) {
					if(!validationErrors[error.path])
						validationErrors[error.path] = error.message ;
				}
				this.setState({validationErrors});							
		});
	}

	onFormSubmit (e) {
		e.preventDefault();
		const order = {
			ingredients : getOptimizedIngredients(this.props.ingredients),
			totalPrice : this.props.totalPrice.toFixed(2),
			orderData : this.state.orderForm,
			userId : this.props.userId
		};

		this.props.orderBurgerInit(order, () => this.props.history.push('/'));			
	
	}

	render () { 
		const formElements = {
			name : {
				elementType : 'input',
				elementConfig : {
					name : 'name',					
					type : 'text',
					placeholder : 'Your name'					
				}
			},
			email : {
				elementType : 'input',
				elementConfig : {
					name : 'email',					
					type : 'email',
					placeholder : 'Your E-mail'					
				}
			},	
			street : {
				elementType : 'input',
				elementConfig : {
					name : 'street',
					type : 'text',
					placeholder : 'Street name'					
				}
			},	
			zipCode : {
				elementType : 'input',
				elementConfig : {
					name : 'zipCode',
					type : 'text',
					placeholder : 'zip-code'					
				}
			},	
			country : {
				elementType : 'input',
				elementConfig : {
					name : 'country',
					type : 'text',
					placeholder : 'country'					
				}
			},	
			deliveryMethod : {
				elementType : 'select',
				elementConfig : {
					name : 'deliveryMethod',					
					options : [
						{value : 'cheapest' , displayName : 'Cheapest'},
						{value : 'fastest' , displayName : 'Fastest'}
					]
				}
			}	 
		};
		const {orderForm, validationErrors, touched } = this.state;
		let form = (
			<form className='mt-2' onSubmit={this.onFormSubmit}>
				<center><h3> Enter Your Contact Here ! </h3></center>
				{Object.keys(formElements).map( element => 
					{	
						let error = null;
						if(validationErrors !== null) 
						 if(validationErrors.hasOwnProperty(element)) 
						 	error = validationErrors[element];
						return (
							<Input key={element} elementType={formElements[element].elementType}
						elementConfig={formElements[element].elementConfig}
						changed={this.onInputchange}
						blured={this.onInputBlur}
						value={orderForm[element]} 
						touched={touched[element]}
						error={error }
						/> );
					}
					
				)}
				<div className='form-group'>
					<button type='submit' 
						disabled={!schema.isValidSync(orderForm)} 
						className='btn btn-lg btn-success text-center'>
					 Order </button>
				</div>
			</form>	
		);

		if(this.props.ordering) form = <Spinner /> ;

		return (
			<div className = 'row'>
				<div className ='col-md-8 offset-md-2 mt-2 p-4 form-shadow'>
					{form}				
				</div>
			</div>

		);
	}
}

const mapStateToProps = ({burger, order, auth}) => ({
	ingredients : burger.ingredients,
	totalPrice : burger.totalPrice,
	ordering : order.ordering,
	userId : auth.localId
})

export default connect(mapStateToProps, {orderBurgerInit}
	)(withErrorHandler(ContactForm, axios));