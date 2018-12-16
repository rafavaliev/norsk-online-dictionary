/*
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
*/

import { applyMiddleware, combineReducers, createStore } from "redux";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_NAME": {
      state = { ...state, name: action.payload };
      break;
    }
    case "CHANGE_AGE": {
      state = { ...state, age: action.payload };
      break;
    }
    case "ERROR": {
      throw new Error("AAA!!");
    }
  }
  return state;
};

const tweetsReducer = (state = [], action) => {
  return state;
};

const logger = store => next => action => {
  console.log("action fired", action);
  next(action);
};

const error = store => next => action => {
  try {
    next(action);
  } catch (e) {
    console.log("AHH!", e);
  }
};

const middleware = applyMiddleware(logger, error);

const reducers = combineReducers({
  user: userReducer,
  tweets: tweetsReducer
});

const store = createStore(reducers, middleware);

store.dispatch({ type: "CHANGE_NAME", payload: "Will" });
store.dispatch({ type: "CHANGE_NAME", payload: "Rafael" });
store.dispatch({ type: "CHANGE_AGE", payload: 24 });
store.dispatch({ type: "ERROR", payload: 24 });
