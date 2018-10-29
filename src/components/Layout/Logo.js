import React from 'react';
import BurgerLogo from '../../assets/images/burger.png';

const Logo = () => (
	<div className='Logo'>
		<img src={BurgerLogo} height='50' width='60' alt='burger-logo' />
	</div>
);

export default Logo;