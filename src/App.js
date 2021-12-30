import 'react-native-gesture-handler';
import Routes from './routes';
import React from 'react';
import Reducers from './store';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

const enhancer =
    composeWithDevTools(applyMiddleware(ReduxThunk, logger));
    
const store = createStore(Reducers, enhancer);

const App = () => {
  return (
    <Provider
      store={store}
    >
      <Routes />
    </Provider>
  );
};

export default App;
