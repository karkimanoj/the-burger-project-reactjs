import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
	constructor (props) {
		super(props);
		this.state = {
			orders : [],
			loading : true
		}
	}

	componentWillMount (){
		//this.setState({loading : true});
		axios.get('/orders.json')
			.then( response => {
				const orders=Object.keys(response.data).map(key => {
					return { id : key,...response.data[key] }
				});
				//console.log('orders',orders)
				this.setState({orders : orders, loading : false});
			})
			.catch( () => {
				this.setState({loading : false});
			});
	}

	render () { 
		
		if(!this.state.loading)
		return(
				<div className='container-fluid mt-3'>
				<h1 className='text-center'> Your Orders ! </h1>
				{this.state.orders.map( order => (
					<Order key={order.id} ingredients={order.ingredients} totalPrice={order.totalPrice}/>
				))}
			</div>
			);
		return <Spinner />;

		
	}
}

export default Orders;