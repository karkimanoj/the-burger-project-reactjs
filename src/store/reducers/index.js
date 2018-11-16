import {combineReducers} from 'redux';
import burgerBuilderReducer from './burgerBuilderReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
	burger : burgerBuilderReducer,
	order : orderReducer
});

export default rootReducer;