import React, {Component, Fragment} from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidebar from '../Navigation/Sidebar/Sidebar';

class Layout extends Component {
	constructor (props) {
		super(props);
		this.state = { showSideDrawer : false };
		this.sideDrawerCloseHandler = this.sideDrawerCloseHandler.bind(this);
		this.sideDrawerToggleHandler = this.sideDrawerToggleHandler.bind(this);
	}
	
	sideDrawerCloseHandler () {
		this.setState({ showSideDrawer : false});
		console.log(this.state);
	}

	sideDrawerToggleHandler () {
		this.setState( (prevState) => ({
			showSideDrawer : !prevState.showSideDrawer 
			})
		);

	}

	render () {
		return(
			<Fragment>	
				<Toolbar sideDrawerToggleClicked = {this.sideDrawerToggleHandler} />
				<Sidebar 
					open = {this.state.showSideDrawer} 
					closed = {this.sideDrawerCloseHandler} 
				/>

		        <main>
					{this.props.children}
		        </main>	       
		    </Fragment>    
		);
	}
	
}

export default Layout;