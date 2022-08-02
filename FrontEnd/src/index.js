import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
<<<<<<< HEAD
import { Provider } from "react-redux";
import User from "./stores/modules/User";
import { createStore } from "redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(User);
=======
import { createStore } from "redux";
import rootReducer from "./stores/modules";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(rootReducer);
>>>>>>> efe1ffe1cf04e2ac28f4ee4bfa8ff92590ff5e35
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
