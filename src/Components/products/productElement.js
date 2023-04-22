import React, { useCallback } from 'react';
import { ShoppingCartOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Row, Col, Grid, Button,
} from 'antd';

const { useBreakpoint } = Grid;

export default function ProductElement({
  product, onView,
}) {
  const handleView = useCallback((e) => {
    e.preventDefault();
    onView(product.product_id);
  }, [product.product_id, onView]);

  const { lg } = useBreakpoint();
  const fontSizeName = lg ? '36px' : '24px';
  const fontSizeDesc = lg ? '28px' : '18px';
  const fontSizeIcon = lg ? '150%' : '100%';
  const fontSizeIco2 = lg ? '100%' : '80%';
  const buttonHeight = lg ? '45px' : '40px';

  return (
    <Row gutter={{
      xs: 8, sm: 16, md: 24, lg: 32,
    }}
    >
      <Col>
        <img src={product.photo} alt="product" width="150px" />
      </Col>
      <Col>
        <div style={{ fontSize: fontSizeName }}><b>{product.name}</b></div>
        <div style={{ fontSize: fontSizeDesc }}>{product.description}</div>
      </Col>
      <Col className="col text-end">
        <div style={{ fontSize: fontSizeName }}>
          €
          {' '}
          {product.price}
        </div>
        <Button
          type="primary"
          danger
          onClick={handleView}
          style={{
            fontSize: '20px', height: buttonHeight, verticalAlign: '3px',
          }}
        >
          <PlusOutlined style={{ fontSize: fontSizeIco2, verticalAlign: '3px' }} />
          <ShoppingCartOutlined style={{ fontSize: fontSizeIcon, verticalAlign: '3px' }} />
        </Button>
      </Col>
    </Row>
  );
}
