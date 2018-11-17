import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => (
	<ul className='NavigationItems'>
		<NavigationItem link='/'  exact> Burgr Builder </NavigationItem>
		{ props.isAuthenticated ? <NavigationItem link='/orders' > Orders </NavigationItem> : null }
		{ props.isAuthenticated ? 
			<NavigationItem link='/logout' > Log Out </NavigationItem> :
			<NavigationItem link='/auth' > Authentication </NavigationItem> }
	</ul>
);

export default NavigationItems;