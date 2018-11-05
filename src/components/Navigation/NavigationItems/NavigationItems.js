import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
	<ul className='NavigationItems'>
		<NavigationItem link='/'  exact> Burgr Builder </NavigationItem>
		<NavigationItem link='/orders' > Orders </NavigationItem>
	</ul>
);

export default NavigationItems;