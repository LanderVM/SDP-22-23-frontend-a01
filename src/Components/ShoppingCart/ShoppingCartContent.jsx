import React, { useContext } from 'react';
import {
  Button, Col, Grid, Row,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;
export default function ShoppingCartContent({
  cart, context,
}) {
  const { removeProductFromShoppingCartContext } = useContext(context);
  const { lg } = useBreakpoint();
  const fontSizeName = lg ? '36px' : '24px';
  const fontSizeDesc = lg ? '28px' : '18px';
  const fontSizeIcon = lg ? '150%' : '100%';
  const buttonHeight = lg ? '45px' : '40px';

  return (
    <Row gutter={{
      xs: 8, sm: 16, md: 24, lg: 32,
    }}
    >
      <Col>
        <img src={cart.photo} alt="product" width="150px" />
      </Col>
      <Col>
        <div style={{ fontSize: fontSizeName }}><b>{cart.name}</b></div>
        <div style={{ fontSize: fontSizeDesc }}>{cart.description}</div>
      </Col>
      <Col className="col text-end">
        <div style={{ fontSize: fontSizeName }}>
          €
          {' '}
          {cart.price}
        </div>
        <Button
          type="primary"
          danger
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
