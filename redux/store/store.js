import { createStore, applyMiddleware } from "redux";
// importing rootReducer.js file.
import rootReducer from "../rootReducer";

// implementing redux middle ware "thunk" so we can call action 
// creators that return a function instead of an action object.
const ReduxThunk = require("redux-thunk").default;
const middlewares = [];
middlewares.push(ReduxThunk);

// creating redux store.
export const store = createStore(rootReducer, applyMiddleware(...middlewares));