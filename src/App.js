import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import Routes from './routes';
import Reducers from './store';

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
