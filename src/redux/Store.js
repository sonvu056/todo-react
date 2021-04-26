import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/RootReduder";
import thunk from "redux-thunk"

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

export default createStore(
  rootReducer,
  //composeEnhancers(
    applyMiddleware(thunk)
  //)
);
