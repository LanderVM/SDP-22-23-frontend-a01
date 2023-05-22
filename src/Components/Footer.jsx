import React from 'react';
import { Footer } from 'antd/es/layout/layout';
import { Grid, Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';

const { useBreakpoint } = Grid;

const pad = '35px';
const colorRed = '#EC4242';
const textSizeSmall = '15px';
const textSizeBig = '20px';
const wh = 'white';

export default function FooterElement() {
  const { lg } = useBreakpoint();

  const textSize = lg ? textSizeBig : textSizeSmall;
  const navSize = lg ? '25px' : '20px';
  const pad2 = lg ? '25px 0' : '10px 0';
  const navElement = {
    color: wh, fontSize: navSize,
  };

  return (
    <Footer style={{
      textAlign: 'center', padding: '100px 0 0 0', fontSize: textSize, fontWeight: 'bold',
    }}
    >
      <div style={{ padding: pad, backgroundColor: colorRed, color: wh }}>
        <img src="/images/Delaware-logo_white.png" alt="Logo" width={200} />
        <div>
          <Row>
            <Col xs={24} sm={8} style={{ padding: pad2 }}>
              <NavLink to="/products" style={navElement}>
                Products
              </NavLink>
            </Col>
            <Col xs={24} sm={8} style={{ padding: pad2 }}>
              <NavLink to="/track" style={navElement}>
                Track & Trace
              </NavLink>
            </Col>
            <Col xs={24} sm={8} style={{ padding: pad2 }}>
              <NavLink to="/orders" style={navElement}>
                Orders
              </NavLink>
            </Col>
          </Row>
        </div>
        <div style={{ paddingTop: '10px' }}>
          Problems? Please contact customersupport, via mail or telephone.
          <br />
          delaware.customerSupport@mail.com
          <br />
          0123456789
        </div>
      </div>
      <div style={{ padding: pad, color: colorRed }}>
        @Copyright Delaware 2023
      </div>
    </Footer>
  );
}
