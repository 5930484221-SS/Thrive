import {
  LOGIN_USER_SUCCESS,
} from './types';

export const loginUserSuccess = (username) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: username
  };
};
