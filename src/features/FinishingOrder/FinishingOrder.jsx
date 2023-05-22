import React, {
  useState, useEffect, useContext, useCallback,
} from 'react';

import {
  Row, Col, List, Grid, Empty,
} from 'antd';

import OrderOverview from './OrderOverview';

import OrderContent from './OrderContent';

import useProducts from '../../api/productService';
import useProfile from '../../api/profile';
import useOrderApi from '../../api/orderService';

import { ProductsForShoppingCartContext } from '../../Contexts/ProductsForShoppingCartContext';

import Error from '../../Components/Error';
import Loader from '../../Components/Loader';

import SingleOrderDetails from './SingleOrderDetails';
import FinishedOrder from './FinishedOrder';
import usePackagingApi from '../../api/packagingService';
import RequireAuth from '../../Components/authentication/RequireAuth';

const { useBreakpoint } = Grid;

export default function FinishingOrder() {
  const {
    productsFromContext, resetShoppingCartContext,
  } = useContext(ProductsForShoppingCartContext);

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
      <Loader loading={loading} />
      <Error error={error} />
      {!loading && !error ? !finished ? <FinishingOrderOverview customerDetails={customer} myCart={myCart} ProductsForShoppingCartContext handleOrder={handleOrder} handleView={handleView} setAddressList={callBack} setPackaging={callBack2} packagingCost={packaging.price} /> : <FinishedOrder /> : null}
    </RequireAuth>
  );
}

function FinishingOrderOverview({
  customerDetails, myCart, handleOrder, handleView, setAddressList, setPackaging, packagingCost,
}) {
  const { lg } = useBreakpoint();
  if (customerDetails == null || myCart == null || handleView == null) {
    return null;
  }
  if (myCart.length === 0) {
    return (
      <Empty description=" There are no products in your shoppingcart" />
    );
  }
  const phoneFormatItemList = lg ? '18' : '24';
  const phoneFormatOverView = lg ? '6' : '24';
  const phoneFormatPaddingItemList = lg ? '40px 20px 40px 40px' : '20px';
  const phoneFormatPaddingOverView = lg ? '40px 40px 40px 20px' : '20px';

  return (
    <>
      <Row>
        <Col span={phoneFormatItemList} style={{ padding: phoneFormatPaddingItemList }}>
          <div>
            <List
              bordered
              style={{ backgroundColor: 'white' }}
              dataSource={myCart}
              data-cy="order"
              pagination={{
                align: 'center',
                pageSize: 10,
              }}
              renderItem={(item) => (
                <List.Item key={item.productId} style={{ display: 'block' }}>
                  <OrderContent cart={item} onView={handleView} context={ProductsForShoppingCartContext} />
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col span={phoneFormatOverView} style={{ padding: phoneFormatPaddingOverView }}>
          <OrderOverview cart={myCart} context={ProductsForShoppingCartContext} onOrder={handleOrder} packagingCost={packagingCost} />
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ margin: '20px' }}>
          <SingleOrderDetails customerDetails={customerDetails} setPackaging={setPackaging} setAddressList={setAddressList} />
        </Col>
      </Row>
    </>
  );
}
