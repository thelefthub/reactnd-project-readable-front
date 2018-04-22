import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'

//logger middleware
// also possible to use redux-logger: npm install --save redux-logger
// curried function: https://stackoverflow.com/questions/32782922/what-do-multiple-arrow-functions-mean-in-javascript
const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

// use redux devtools....
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(logger) //add logger middleware to the store
  )
)

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
  </BrowserRouter>, document.getElementById('root'));
