// Entry point for rendering the React app
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { persistor, store } from 'redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';

// Rendering the app within Redux Provider and PersistGate for state persistence
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename="/goit-react-hw-08-phonebook">
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
