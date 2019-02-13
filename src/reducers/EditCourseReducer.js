import { COURSE_SET } from "../actions/types";

const EDIT_COURSE_INITIAL_STATE = {
  course: {}
};

export default (state = EDIT_COURSE_INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case COURSE_SET:
      console.log("reducer", action.payload)
      return Object.assign({},state,{course :action.payload})
    default:
      return state;
  }
};