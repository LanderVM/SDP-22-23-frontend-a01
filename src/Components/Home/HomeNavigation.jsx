import { useNavigate } from 'react-router';
import './homePageStyle.css';
import React, { useCallback } from 'react';

export default function HomeNavigation() {
  const navigate = useNavigate();

  const navigateToProducts = useCallback(() => {
    navigate('/products');
  }, [navigate]);

  return (
    <div className="container">
      <div className="row">

        <button type="button" className="col" onClick={navigateToProducts} onKeyDown={navigateToProducts}>
          <img src="/images/productsHomePage.png" alt="resembles products" />
          <div>
            Go to consulting products.
          </div>
        </button>
        <div className="col">
          <img src="/images/profileHomePage.png" alt="resembles profile" />
          <div>
            Go to consulting profile.
          </div>
        </div>
        <div className="col">
          <img src="/images/track&traceHomePage.png" alt="resembles track & trace" />
          <div>
            Go to track & tracing an order.
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <img src="/images/consultingOrderHomePage.png" alt="resembles consulting order" />
          <div>
            Go to consulting orders.
          </div>
        </div>
        <div className="col">
          <img src="/images/notificationHomePage.png" alt="resembles notification" />
          <div>
            Go to consulting notifications.
          </div>
        </div>
        <div className="col">
          <img src="/images/makingOrderHomePage.png" alt="resembles making order" />
          <div>
            Go to making an order.
          </div>
        </div>
      </div>
    </div>
  );
}
