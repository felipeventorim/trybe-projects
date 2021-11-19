// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ACTIONS } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTIONS.LOGIN:
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default userReducer;
