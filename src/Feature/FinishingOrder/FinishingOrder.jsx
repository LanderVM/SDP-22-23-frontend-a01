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
import useOrder from '../../api/orderService';

import { ProductsForShoppingCartContext } from '../../Contexts/ProductsForShoppingCartContext';

import Error from '../../Components/Error';
import Loader from '../../Components/Loader';

import SingleOrderDetails from './SingleOrderDetails';
import FinishedOrder from './FinishedOrder';

const { useBreakpoint } = Grid;

export default function FinishingOrder() {
  const {
    productsFromContext, resetShoppingCartContext,
  } = useContext(ProductsForShoppingCartContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [finished, setFinished] = useState(false);

  const [customer, setCustomer] = useState(null);
  const [deliveryCity, setDeliveryCity] = useState(null);
  const [deliveryCounrty, setDeliveryCounrty] = useState(null);
  const [deliveryPostalCode, setDeliveryPostalCode] = useState(null);
  const [deliveryStreet, setDeliveryStreet] = useState(null);
  const [deliveryBus, setDeliveryBus] = useState(null);
  const [deliveryHouseNumber, setDeliveryHouseNumber] = useState(null);
  const [packaging, setPackaging] = useState(null);
  const [myCart, setCart] = useState(null);

  const profileApi = useProfile();
  const productenApi = useProducts();
  const orderApi = useOrder();

  const callBack = async (data) => {
    setDeliveryCity(data.delivery_city);
    setDeliveryCounrty(data.delivery_country);
    setDeliveryPostalCode(data.delivery_postal_code);
    setDeliveryStreet(data.delivery_street);
    setDeliveryBus(data.delivery_box);
    setDeliveryHouseNumber(data.delivery_house_number);
  };

  const callBack2 = async (data) => {
    setPackaging(data.packagingId);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (productsFromContext && productsFromContext.length > 0) {
          setLoading(true);
          setError(null);
          const data = await productenApi.getByIds(productsFromContext);
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
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const dbOrderList = await profileApi.getCompanyInfo();
        setCustomer(dbOrderList);
      } catch (error2) {
        setError(error2);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleView = useCallback(async (nameToView) => {
    try {
      setError(null);
      await productenApi.getByName(nameToView);
    } catch (err) {
      setError(err);
    }
  }, []);

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      const request = await orderApi.placeOrder({
        delivery_country: deliveryCounrty || customer.supplier_delivery_country,
        delivery_city: deliveryCity || customer.supplier_delivery_city,
        delivery_postal_code: deliveryPostalCode || customer.supplier_delivery_postal_code.toString(),
        delivery_street: deliveryStreet || customer.supplier_delivery_street,
        delivery_house_number: deliveryHouseNumber || customer.supplier_delivery_house_number.toString(),
        delivery_box: deliveryBus || customer.supplier_delivery_box,
        PACKAGING_packaging_id: packaging || 1,
        SUPPLIER_supplier_id: customer.supplier_id,
        order_lines: productsFromContext,
      });
      console.log(request);
      setFinished(true);
      resetShoppingCartContext();
      // window.location.reload(false);
    } catch (error3) {
      setError(error3);
    }
  };

  return (
    <div>
      <Loader loading={loading} />
      <Error error={error} />
      {!loading && !error ? !finished ? <FinishingOrderOverview customerDetails={customer} myCart={myCart} ProductsForShoppingCartContext handleOrder={handleOrder} handleView={handleView} setAddressList={callBack} setPackaging={callBack2} /> : <FinishedOrder /> : null}
    </div>
  );
}

function FinishingOrderOverview({
  customerDetails, myCart, handleOrder, handleView, setAddressList, setPackaging,
}) {
  if (customerDetails == null || myCart == null || handleView == null) {
    return (
      null
    );
  }
  if (myCart.length === 0) {
    return (
      <Empty description=" There are no products in your shoppingcart" />
    );
  }
  const { lg } = useBreakpoint();
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
          <OrderOverview cart={myCart} context={ProductsForShoppingCartContext} onOrder={handleOrder} />
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
