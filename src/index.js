import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import logger from "redux-logger";
import burgerBuilderReducer from "./store/reducer/burgerBuilderReducer";
import orderReducer from "./store/reducer/orderReducer";
import authReducer from "./store/reducer/authReducer"
import thunk from "redux-thunk";

const composeEnhancers =process.env.NODE_ENV==='development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;
let newLogger=process.env.NODE_ENV==='development'?logger :null 
const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth:authReducer,
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk,newLogger))
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
