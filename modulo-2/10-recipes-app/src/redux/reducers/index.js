import { combineReducers } from 'redux';
import foodReducer from './foodReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  foods: foodReducer,
  user: userReducer,
});

export default rootReducer;
