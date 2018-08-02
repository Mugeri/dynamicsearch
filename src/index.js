import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';

import App from './components/App';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const {
  store,
  persistor
} = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<App />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
