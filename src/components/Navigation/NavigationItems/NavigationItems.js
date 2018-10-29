import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
	<ul className='NavigationItems'>
		<NavigationItem link='/' active > Burgr Builder </NavigationItem>
		<NavigationItem link='/' > Checkout </NavigationItem>
	</ul>
);

export default NavigationItems;