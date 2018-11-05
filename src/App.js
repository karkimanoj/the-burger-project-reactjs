import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Switch, Route} from 'react-router-dom';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <Layout >
        <div style = {{marginTop : '56px'}}>
		  <Switch>
		  
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
