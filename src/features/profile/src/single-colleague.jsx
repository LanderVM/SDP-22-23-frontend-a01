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
      <Col>
        <img src={colleague.image_URL} alt="" width="100px" />
      </Col>
      <Col
        style={{ marginLeft: '30px' }}
      >
        <p data-cy="colleagueUsername">
          <b>{colleague.username}</b>
        </p>
        <p data-cy="colleagueEmail">
          {colleague.email}
        </p>
      </Col>
      <Col
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '15px',
          marginBottom: '15px',
          textAlign: 'right',
          justifyContent: 'right',
          flex: '1 0 25%',
        }}
      >
        <Button
          onClick={() => window.location.href = `mailto:${colleague.email}`}
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
