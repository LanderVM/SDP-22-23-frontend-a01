import {
  Col, Empty, List, Row,
} from 'antd';
import React from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import Product from './product';
import { ShoppingCartProducts } from '../../../contexts/shopping-cart-products';
import SideOverview from './side-overview';
import SingleOrderDetails from './order-details';

export default function CheckoutOverview({
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
                  <Product cart={item} onView={handleView} context={ShoppingCartProducts} />
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col span={phoneFormatOverView} style={{ padding: phoneFormatPaddingOverView }}>
          <SideOverview cart={myCart} context={ShoppingCartProducts} onOrder={handleOrder} packagingCost={packagingCost} />
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
