import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Auth from './containers/Auth/Auth';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Logout from './containers/Auth/Logout';
import {connect} from 'react-redux';
import {authCheckState} from './store/actions';

class App extends Component {

	componentDidMount() {
		this.props.tryAutoLogin();
	}

	render() { 
		let routes = (
			<Switch>
			  	<Route path='/auth' component={Auth}/>	
			  	<Route path='/' exact component={BurgerBuilder}/>
			  	<Redirect to='/' />	
		  	</Switch>
		);

		if(this.props.isAuthenticated)
			routes = (
				<Switch>
				  	<Route path='/logout' component={Logout}/>
				  	<Route path='/checkout' component={Checkout}/>
				  	<Route path='/orders'  component={Orders}  />
					<Route path='/' exact component={BurgerBuilder}/>
					<Redirect to='/' />	
				</Switch>
			);

	return (
	  <Layout >
	    <div style = {{marginTop : '56px'}}>
		  {routes}
		 </div>
	  </Layout>
	);
	}
}

const mapStateToProps = ({auth}) => ({ isAuthenticated : auth.idToken !== null})

//withRouter HOC is used bcoz the react-router-dom Route is breaked by connect HOC
export default withRouter(connect(mapStateToProps, {tryAutoLogin: authCheckState})(App));
