import { createStore, applyMiddleware, compose } from 'redux';
import stockSelectrootReducer from '../stockSelect/reducers';
import globalrootReducer from '../global/reducers';
//import { forbiddenWordsMiddleware } from "../middleware";
import thunk from 'redux-thunk';

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(stockSelectrootReducer, globalrootReducer, storeEnhancers(applyMiddleware(thunk)));

export default store;
