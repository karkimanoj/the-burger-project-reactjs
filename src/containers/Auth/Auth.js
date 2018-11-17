import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {authenticateUser} from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

const schema = Yup.object().shape({
	email : Yup.string().required().email(),
	password : Yup.string().required().min(6).max(255)
});

class Auth extends Component {
	constructor (props) {
		super(props);
		this.state = {
			authForm : {
				email : '',
				password : ''
			},
			touched : {
				email : false,
				password : false
			},
			validationErrors : null,
			isSignUp : false
		};

		this.onInputchange = this.onInputchange.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.onInputBlur = this.onInputBlur.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onAuthModeSwitch = this.onAuthModeSwitch.bind(this);
	}	
	
	onInputchange (e) {
		const {name, value} = e.target;
		this.setState( prevState => {
			const updatedAuthForm = { 
				...prevState.authForm,
				[name] : value
			};
			const updatedTouched = { 
				...prevState.touched,
				[name] : true
			};
			return { authForm : updatedAuthForm , touched : updatedTouched};
		}, this.validateForm() ); //this.validateForm()

		//this.setState({ authForm : updatedAuthForm , touched : updatedTouched});
		//console.log('updatedAuthForm',updatedAuthForm);
		
	}
	
	onInputBlur (e) {
		const {name} = e.target;
		
		this.setState(prevState => {
			const updatedTouched = { 
				...prevState.touched,
				[name] : true
			};
			return { touched : updatedTouched} ;
		}, this.validateForm() );
		
	}

	validateForm () {
		schema.validate(this.state.authForm , { abortEarly: false })
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
	
	onAuthModeSwitch () {
		this.setState(prevState => {
			return {isSignUp : !prevState.isSignUp}
		});
	}

	onFormSubmit (e) {
		e.preventDefault();
		const {email, password} = this.state.authForm
		this.props.authenticateUser(email, password, this.state.isSignUp);
	}

	render () {	
		//console.log(this.props.loading+' '+this.props.error)
		const formElements = {
			email : {
				elementType : 'input',
				elementConfig : {
					name : 'email',
					type : 'email',
					placeholder : 'Your email address'
				}
			},
			password : {
				elementType : 'input',
				elementConfig : {
					name : 'password',
					type : 'password',
					placeholder : 'password'
				}
			}
		};

		const {authForm, validationErrors, touched } = this.state;
		
		let form =(
			<form className='mt-2' onSubmit={this.onFormSubmit}>
				<center>
				<h3 className='mb-3'> {this.state.isSignUp ? 'Sign Up' : 'Sign In'}
				</h3></center>
				{this.props.error && 
					<div className="alert alert-danger" >
					  {this.props.error}
					</div>
				}
				{ 
					
					 
					Object.keys(formElements).map(el => {
						let error = null;
						if(validationErrors !== null) 
							if(validationErrors.hasOwnProperty(el)) 
								error = validationErrors[el];	

						return <Input key={el}
							elementType = {formElements[el].elementType}
							elementConfig = {formElements[el].elementConfig}
							value = {authForm[el]}
							changed = {this.onInputchange}
							blured = {this.onInputBlur}
							error = {error}
							touched = {touched[el]}/>	
					})
				}

				<div className='form-group text-center'>
					<button type='submit' 
						disabled={!schema.isValidSync(authForm)}
						className='btn btn-lg btn-success text-center'>
					 	Submit 
					</button>
				</div>
				<div className='form-group text-center'>
					<button type='button' 						
						onClick = {this.onAuthModeSwitch}
						className='btn btn-lg btn-outline-danger borderless text-center'>
					 	SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'} 
					</button>
				</div>						
			</form>				
		);		

		if(this.props.loading) form = <Spinner/>
		
		return (
			<div className = 'row'>
				<div className ='col-md-6 offset-md-3 mt-5 p-4 form-shadow'>
					{this.props.isAuthenticated && <Redirect to='/' />}
					{form}				
					
				</div>
			</div>

		);
	}
}

const mapStateToProps = ({auth}) => ({
	loading : auth.loading,
	error : auth.error,
	isAuthenticated : auth.idToken !== null
});	

export default connect(mapStateToProps, {authenticateUser})(Auth);