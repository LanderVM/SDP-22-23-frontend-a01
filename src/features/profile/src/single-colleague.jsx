import {
  Button, Col, Grid, Row,
} from 'antd';
import React from 'react';
import { MailOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;

export default function SingleColleague({ colleague }) {
  const { lg } = useBreakpoint();
  const { md } = useBreakpoint();

  const fontSizeAddToCartIcon = md ? '125%' : '100%';
  const buttonHeight = md ? '60px' : '40px';
  const marginDetails = md ? '10px' : '5px';

  return (
    <Row data-cy="colleagueInfo">
      <Col span={6} xs={15} lg={6}>
        <img src={colleague.image_URL} alt="" style={{ maxWidth: '40%' }} />
      </Col>
      <Col
        span={7}
        xs={10}
        lg={7}
        style={{ marginBottom: '15px', marginTop: '15px' }}
      >
        <p data-cy="colleagueUsername">
          {colleague.username}
        </p>
        <p data-cy="colleagueEmail">
          {colleague.email}
        </p>
      </Col>
      <Col
        span={10}
        xs={15}
        lg={10}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '15px',
          marginBottom: '15px',
        }}
      >
        <Button
          style={{
            fontSize: fontSizeAddToCartIcon,
            height: buttonHeight,
            margin: marginDetails,
            color: '#e0433e',
            borderColor: '#e0433e', // TODO ja of nee
            marginLeft: lg ? '90%' : '',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MailOutlined style={{ fontSize: fontSizeAddToCartIcon }} />
          <span style={{
            fontSize: '95%',
          }}
          >
            Contact
          </span>
        </Button>
      </Col>
    </Row>
  );
}
