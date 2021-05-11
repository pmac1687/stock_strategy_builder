import React from 'react';
//import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';
//import index from "./js/index";

import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./js/store/index";
//import App from "./js/components/App";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);