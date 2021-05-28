import React from 'react';
//import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';
//import index from "./js/index";

import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./js/store/index";
import 'bootstrap/dist/css/bootstrap.min.css';
//import $ from 'jquery';
//import Popper from 'popper.js';
//import 'bootstrap/dist/js/bootstrap.bundle.min';
//import App from "./js/components/App";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);