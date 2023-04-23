import React from 'react';
import './trackingInput.scss';
import {
  Input, Form, Col, Row, Button,
} from 'antd';

export default function TrackingInput() {
  return (
    <div className="delaware-tracking-page">
      <div className="delaware-tracking-head">
        <h1>Order&nbsp;Tracking&nbsp;Page</h1>
        <p>
          To track your order please enter your Tracking code in the first box
          and the extra verification code you received after ordering in the second box
        </p>
      </div>
      <Form>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Tracking code" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Extra Verification code" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">Track</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
