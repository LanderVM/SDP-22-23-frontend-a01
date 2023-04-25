import React, { useState } from 'react';
import './trackingInput.scss';
import {
  Input, Form, Col, Row, Button,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import useOrderTracker from '../../api/orderTrackingService';
import TrackingInfo from './TrackingInfo';
import Error from '../Error';
import Loader from '../Loader';

export default function TrackingInput() {
  const [form] = useForm();
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const orderTrackingApi = useOrderTracker();

  const onFinish = async (values) => {
    const fetchTrackingInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        const toTrackOrder = await orderTrackingApi.getTrackingStatus(values);
        setTrackingInfo(toTrackOrder);
      } catch (error2) {
        if (error2.response.data.details.query !== undefined) { // validation failure
          const validationFailureMessages = Object.values(error2.response.data.details.query)[0];
          setError(validationFailureMessages[0]);
        } else if (error2.response.data.message !== undefined) { // no order found
          setError(error2.response.data);
        } else setError(error2); // other errors
      } finally {
        setLoading(false);
      }
    };
    fetchTrackingInfo();
  };

  const clearTracker = () => {
    try {
      setTrackingInfo(null);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delaware-tracking-page">
      <div className="delaware-tracking-head">
        <h1>Order&nbsp;Tracking&nbsp;Page</h1>
        <p>
          To track your order please enter your Tracking code in the first box
          and the extra verification code you received after ordering in the second box
        </p>
      </div>
      <TrackingInfo tracker={trackingInfo} />
      { trackingInfo !== null ? (
        <Button type="primary" htmlType="reset" onClick={clearTracker}>Track Different Product</Button>
      )
        : (
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
        )}
      <Error error={error} />
      {!error
        ? <Loader loading={loading} />
        : null}
    </div>
  );
}
