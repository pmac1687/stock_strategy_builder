import React from 'react';
//import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';

//add redux
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './js/store/index';
import 'bootstrap/dist/css/bootstrap.min.css';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
