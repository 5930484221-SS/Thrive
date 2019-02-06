import {
  LOGIN_USER_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  username: '',
};

export default (state = INITIAL_STATE, action) => {
  console.log(action, action.payload);
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return { ...state, username: action.payload };
    default:
      return state;
  }
};
