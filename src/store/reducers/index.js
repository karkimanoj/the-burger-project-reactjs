import {combineReducers} from 'redux';
import BurgerReducer from './BurgerReducer';

const rootReducer = combineReducers({
	burger : BurgerReducer
});

export default rootReducer;