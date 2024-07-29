import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';

import { SocketProvider } from './context/SocketProvider.jsx';

import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SocketProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </SocketProvider>
  </React.StrictMode>
);