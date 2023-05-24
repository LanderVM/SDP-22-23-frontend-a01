import React, { useContext } from 'react';
import {
  Button, Col, Grid, InputNumber, Row,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;
export default function Products({
  cart, context,
}) {
  const { removeProductFromShoppingCartContext, productsFromContext, addProductToShoppingCartContext } = useContext(context);
  const { lg } = useBreakpoint();
  const fontSizeName = lg ? '24px' : '12px';
  const fontSizeDesc = lg ? '18px' : '8px';
  const fontSizeIcon = lg ? '120%' : '70%';
  const buttonHeight = lg ? '40px' : '35px';

  const product = productsFromContext.filter((e) => e.productId === cart.product_id);
  const productAmount = product.map((el) => el.amount);

  const handleChange = (value) => {
    addProductToShoppingCartContext(cart, parseInt(value, 10));
  };

  return (
    <Row gutter={{
      xs: 8, sm: 16, md: 24, lg: 32,
    }}
    >
      <Col>
        <img src={cart.image_URL} alt="product" width="100px" />
      </Col>
      <Col style={{ flex: '1 0 50%' }}>
        <div style={{ fontSize: fontSizeName }} data-cy="cartName"><b>{cart.name}</b></div>
        <div style={{ fontSize: fontSizeDesc }} data-cy="cartDescription">{cart.description}</div>
        <div>
          <InputNumber min={1} max={1000} inputMode="numeric" defaultValue={productAmount} onChange={handleChange} />
        </div>
      </Col>
      <Col style={{ textAlign: 'right', justifyContent: 'right', flex: '1 0 25%' }}>
        <div data-cy="cartPrice" style={{ fontSize: fontSizeName }}>
          €&nbsp;
          {cart.price * productAmount }
        </div>

        <Button
          type="primary"
          danger
          data-cy="removeCartItem"
          onClick={() => removeProductFromShoppingCartContext(cart.product_id)}
          style={{
            fontSize: '20px', height: buttonHeight, verticalAlign: '3px',
          }}
        >
          <DeleteOutlined style={{ fontSize: fontSizeIcon, verticalAlign: '3px' }} />

        </Button>
      </Col>
    </Row>

  );
}
