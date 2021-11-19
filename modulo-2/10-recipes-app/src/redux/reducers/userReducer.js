import { allActions } from '../actions';

const initialState = {
  email: '',
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case allActions.SAVE_EMAIL:
    return {
      ...state,
      email: payload,
    };
  default:
    return state;
  }
};

export default userReducer;
