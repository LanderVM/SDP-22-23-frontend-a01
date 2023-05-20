import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import MyAuth0Provider from './Contexts/MyAuth0Provider';
import ProductsForShoppingCartProvider from './Contexts/ProductsForShoppingCartContext';
import NotificationsProvider from './Contexts/NotificationsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductsForShoppingCartProvider>
      <MyAuth0Provider>
        <NotificationsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </NotificationsProvider>
      </MyAuth0Provider>
    </ProductsForShoppingCartProvider>
  </React.StrictMode>,
);

reportWebVitals();
