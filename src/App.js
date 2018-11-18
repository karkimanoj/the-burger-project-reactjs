import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Auth from './containers/Auth/Auth';
import {Switch, Route} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Logout from './containers/Auth/Logout';

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoLogin();
	}

	render() { 
	return (
	  <Layout >
	    <div style = {{marginTop : '56px'}}>
		  <Switch>
		  	<Route path='/auth' component={Auth}/>	
		  	<Route path='/logout' component={Logout}/>
		  	<Route path='/checkout' component={Checkout}/>
		  	<Route path='/orders'  component={Orders}  />
			<Route path='/' exact component={BurgerBuilder}/>

		  </Switch>
		 </div>
	  </Layout>
	);
	}
}

export default App;
