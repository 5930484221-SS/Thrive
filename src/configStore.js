import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import firebase from "firebase";
import ReduxThunk from "redux-thunk";
import AuthReducer from "./reducers/AuthReducer";

// Add firebase to reducers
const rootReducer = combineReducers({
  auth: AuthReducer,
});

// Create store with reducers and initial state
const initialState = {};

const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null
export const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(ReduxThunk),
  )
);
