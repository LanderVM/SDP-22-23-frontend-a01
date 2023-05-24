import React, {
  useState, useEffect, useContext, useCallback,
} from 'react';

import useProducts from '../../../api/product-service';
import useProfile from '../../../api/profile-service';
import useOrderApi from '../../../api/order-service';

import { ShoppingCartProducts } from '../../../contexts/shopping-cart-products';

import Error from '../../../Components/error';
import Loader from '../../../Components/loader';

import SuccessfulOrder from './successful-order';
import usePackagingApi from '../../../api/packaging-service';
import RequireAuth from '../../../Components/authentication/RequireAuth';
import CheckoutOverview from './checkout-overview';
import '../checkout.scss';

export default function Checkout() {
  const {
    productsFromContext, resetShoppingCartContext,
  } = useContext(ShoppingCartProducts);

  const profileApi = useProfile();
  const productsApi = useProducts();
  const orderApi = useOrderApi();
  const packagingApi = usePackagingApi();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);

  const [customer, setCustomer] = useState(null);
  const [deliveryCity, setDeliveryCity] = useState(null);
  const [deliveryCountry, setDeliveryCountry] = useState(null);
  const [deliveryPostalCode, setDeliveryPostalCode] = useState(null);
  const [deliveryStreet, setDeliveryStreet] = useState(null);
  const [deliveryBus, setDeliveryBus] = useState(null);
  const [deliveryHouseNumber, setDeliveryHouseNumber] = useState(null);
  const [packaging, setPackaging] = useState({ packaging_id: 0, price: '€ 0' });
  const [myCart, setCart] = useState(null);

  const callBack = async (data) => {
    setDeliveryCity(data.delivery_city);
    setDeliveryCountry(data.delivery_country);
    setDeliveryPostalCode(data.delivery_postal_code);
    setDeliveryStreet(data.delivery_street);
    setDeliveryBus(data.delivery_box);
    setDeliveryHouseNumber(data.delivery_house_number);
  };

  const callBack2 = async (data) => {
    if (data !== null && data.packaging_id !== undefined) setPackaging(data);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (productsFromContext && productsFromContext.length > 0) {
          setLoading(true);
          setError(null);
          const data = await productsApi.getByIds(productsFromContext);
          setCart(data);
        }
      } catch (error2) {
        setError(error2);
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [productsFromContext]);

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        const dbCustomerInfo = await profileApi.getCompanyInfo();
        setCustomer(dbCustomerInfo);
      } catch (error2) {
        setError(error2);
      } finally {
        setLoading(false);
      }
    };
    const fetchPackagingList = async () => {
      const dbPackagingList = await packagingApi.getPackagingsList();
      setPackaging(dbPackagingList.items[0]);
    };
    fetchCustomerInfo();
    fetchPackagingList();
  }, []);

  const handleView = useCallback(async (nameToView) => {
    try {
      setError(null);
      await productsApi.getByName(nameToView);
    } catch (err) {
      setError(err);
    }
  }, []);

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      await orderApi.placeOrder({
        delivery_country: deliveryCountry,
        delivery_city: deliveryCity,
        delivery_postal_code: deliveryPostalCode,
        delivery_street: deliveryStreet,
        delivery_house_number: deliveryHouseNumber,
        delivery_box: deliveryBus,
        PACKAGING_packaging_id: packaging.packaging_id,
        supplier_id: customer.supplier_id,
        SUPPLIER_supplier_id: customer.SUPPLIER_supplier_id,
        order_lines: productsFromContext,
      });
      setFinished(true);
      resetShoppingCartContext();
      // window.location.reload(false);
    } catch (error3) {
      setError(error3);
    }
  };

  return (
    <RequireAuth>
      <main id="checkout-page">
        <Loader loading={loading} />
        <Error error={error} />
        {!loading && !error ? !finished ? <CheckoutOverview customerDetails={customer} myCart={myCart} ProductsForShoppingCartContext handleOrder={handleOrder} handleView={handleView} setAddressList={callBack} setPackaging={callBack2} packagingCost={packaging.price} /> : <SuccessfulOrder /> : null}
      </main>
    </RequireAuth>
  );
}
