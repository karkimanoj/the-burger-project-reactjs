import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import * as Yup from 'yup';

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
			validationErrors : null
		};

		this.onInputchange = this.onInputchange.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.onInputBlur = this.onInputBlur.bind(this);
	}	
	
	onInputchange (e) {
		const {name, value} = e.target;
		const updatedAuthForm = { 
			...this.state.authForm,
			[name] : value
		};
		const updatedTouched = { 
			...this.state.touched,
			[name] : true
		};
		this.setState({ authForm : updatedAuthForm , touched : updatedTouched});
		this.validateForm();
	}
	
	onInputBlur (e) {
		const {name} = e.target;
		
		this.setState(prevState => {
			const updatedTouched = { 
				...prevState.touched,
				[name] : true
			};
			return { touched : prevState.touched} ;
		});
		this.validateForm();
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
	render () {
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
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<form className='mt-2' onSubmit>
						<center><h3> Enter Your Contact Here ! </h3></center>
						{ 
							Object.keys(formElements).map(el => {
								let error = null;
								if(validationErrors !== null) 
									if(validationErrors.hasOwnProperty(el)) 
										error = validationErrors[el];	

								return <Input 
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
								disabled={this.state.validationErrors ? true : false} 
								className='btn btn-lg btn-success text-center'>
							 	Order 
							</button>
						</div>					
					</form>
				</div>
			</div>	
				
		);		

		return form;
	}
}

export default Auth;