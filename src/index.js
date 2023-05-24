import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import ProductsForShoppingCartProvider from './contexts/shopping-cart-products';
import NotificationsProvider from './contexts/notifications';
import MyAuth0Provider from './contexts/my-auth0-provider';

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
