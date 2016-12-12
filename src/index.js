import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Randomize from './middlewares/randomize';
import NamesRepeatChecker from './middlewares/names-repeat-checker';
import Async from './middlewares/async';
import EmailValidation from './middlewares/email-validation';
import NameValidation from './middlewares/name-validation';


import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(Async, NamesRepeatChecker, Randomize, EmailValidation, NameValidation)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));
