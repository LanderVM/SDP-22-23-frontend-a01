import React, { useContext } from 'react';
import {
  Button, Col, Grid, Row, Select,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;
export default function ShoppingCartContent({
  cart, context,
}) {
  const handleChange = () => null;

  const { removeProductFromShoppingCartContext } = useContext(context);
  const { lg } = useBreakpoint();
  const fontSizeName = lg ? '24px' : '12px';
  const fontSizeDesc = lg ? '18px' : '8px';
  const fontSizeIcon = lg ? '120%' : '70%';
  const buttonHeight = lg ? '40px' : '35px';

  return (
    <Row gutter={{
      xs: 8, sm: 16, md: 24, lg: 32,
    }}
    >
      <Col>
        <img src={cart.photo} alt="product" width="100px" />
      </Col>
      <Col>
        <div style={{ fontSize: fontSizeName }}><b>{cart.name}</b></div>
        <div style={{ fontSize: fontSizeDesc }}>{cart.description}</div>
        <div>
          <Select
            defaultValue="1"
            style={{ width: 90 }}
            onChange={handleChange}
            options={[
              { value: '1', label: '1' },
              { value: '2', label: '2' },
              { value: '3', label: '3' },
              { value: '4', label: '4' },
            ]}
          />
        </div>
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
