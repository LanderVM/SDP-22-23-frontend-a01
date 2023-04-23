import React, { useState } from 'react';
import './trackingInput.scss';
import {
  Input, Form, Col, Row, Button,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import useOrderTracker from '../../api/orderTrackingService';

export default function TrackingInput() {
  const [form] = useForm();
  const [tracker, setTracker] = useState(null);
  const orderTrackingApi = useOrderTracker();

  const onFinish = async (values) => {
    const toTrackOrder = await orderTrackingApi.getTrackingStatus(values);
    setTracker(toTrackOrder);
  };

  return (
    <div className="delaware-tracking-page">
      {/* TODO add tracking page */}
      {/* TODO add error component */}
      {/* TODO add loading component */}
      <p>{!tracker ? 'aaa' : tracker.items.delivery_country}</p>
      <div className="delaware-tracking-head">
        <h1>Order&nbsp;Tracking&nbsp;Page</h1>
        <p>
          To track your order please enter your Tracking code in the first box
          and the extra verification code you received after ordering in the second box
        </p>
      </div>
      <Form form={form} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="trackingCode" label="Tracking code" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="verificationCode" label="Extra Verification code" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} rules={[{ required: true }]}>
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
