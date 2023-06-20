import {
  Button, Col, Grid, Row,
} from 'antd';
import React from 'react';
import { MailOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;

export default function SingleColleague({ colleague }) {
  // eslint-disable-next-line no-unused-vars
  const { lg, md, xs } = useBreakpoint();

  const fontSizeAddToCartIcon = md ? '125%' : '100%';
  const buttonHeight = lg ? '50px' : md ? '40px' : '30';
  const marginDetails = md ? '10px' : '5px';

  return (
    <Row data-cy="colleagueInfo">
      <Col
        span={6}
        xs={23}
        lg={6}
        style={{
          display: 'flex',
          alignItems: 'center',
          textAlign: xs ? 'center' : 'left',
          justifyContent: xs ? 'center' : 'left',
          flex: '1 0 25%',
        }}
      >
        <img src={colleague.image_URL} alt="" width="100px" />
      </Col>
      <Col
        span={6}
        xs={23}
        lg={6}
        style={{
          display: xs ? 'flex' : '',
          flexWrap: 'wrap',
          alignItems: 'center',
          textAlign: xs ? 'center' : 'left',
          justifyContent: xs ? 'center' : 'left',
          flex: '1 0 25%',
        }}
      >
        <p data-cy="colleagueUsername" style={{ margin: '0', paddingTop: '5%' }}>
          <b>{colleague.username}</b>
        </p>
        <p data-cy="colleagueEmail" style={{ margin: '0', paddingBottom: '5%' }}>
          {colleague.email}
        </p>
      </Col>
      <Col
        span={6}
        xs={23}
        lg={6}
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '15px',
          marginBottom: '15px',
          marginLeft: lg ? '20%' : '',
          textAlign: xs ? 'center' : 'right',
          justifyContent: xs ? 'center' : 'right',
          flex: '1 0 25%',
        }}
      >
        <Button
          onClick={() => window.location.href = `mailto:${colleague.email}`}
          style={{
            fontSize: fontSizeAddToCartIcon,
            height: buttonHeight,
            margin: marginDetails,
            // marginRight: xs ? '25%' : '',
            color: '#e0433e',
            borderColor: '#e0433e',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: xs ? '100%' : '',
          }}
        >
          <MailOutlined style={{ fontSize: fontSizeAddToCartIcon, paddingLeft: xs ? '1px' : '' }} />
          <span style={{
            fontSize: xs ? '100%' : '95%',
          }}
          >
            Contact
          </span>
        </Button>
      </Col>
    </Row>
  );
}
