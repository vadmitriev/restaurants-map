import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import RestaurantStore from 'store/RestaurantStore';
import Modal from 'react-modal';

import './index.scss';

export const Context = createContext(null);

Modal.setAppElement('#root');

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={{ store: RestaurantStore }}>
      <App />
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
