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
import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";
import promise from "redux-promise-middleware";

const initialState = {
  fetching: false,
  fetched: false,
  words: [],
  err: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_WORDS_PENDING": {
      return { ...state, fetching: true };
    }
    case "FETCH_WORDS_FULFILLED": {
      return { ...state, fetching: false, words: action.payload };
    }
    case "FETCH_WORDS_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
  }
  return state;
};

const middleware = applyMiddleware(promise(), thunk, logger);
const store = createStore(reducer, middleware);

store.dispatch(dispatch => {
  dispatch({ type: "FETCH_WORDS" });
  axios
    .get("http://ya.ru")
    .then(response => {
      dispatch({
        type: "RECEIVED_WORDS",
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({ type: "FETCH_WORD_ERROR", payload: err });
    });
});

store.dispatch({
  type: "FETCH_USERS",
  payload: axios.get("http://ya.ru")
});
