import {
  Button, Col, Form, Input, Modal, Row,
} from 'antd';
import React, { useState } from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import './modal.scss';

export default function ChangeAddressModal({ orderDetails }) {
  console.log(orderDetails);
  // if (orderDetails.order_status !== 0) return null; TODO re-enable when done with testing

  const [isModalOpen, setIsModalOpen] = useState(false);
  const size0 = 0;
  const { lg } = useBreakpoint();
  const fontSizeMini = lg ? '18px' : '14px';

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    // TODO try post & show confirmation, catch & display error
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="link" onClick={showModal} style={{ padding: size0, fontSize: fontSizeMini }}> &#62;&nbsp;Change address</Button>
      <Modal
        title="Change address"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
      >
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Form.Item
                name="street"
                label="Street"
                rules={[{ required: true, type: 'string' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="houseNumber"
                label="House Number"
                rules={[{ required: true, type: 'number' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="busNumber"
                label="Bus"
                rules={[{ type: 'number' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Form.Item
                name="postalCode"
                label="Postal Code"
                rules={[{ required: true, type: 'number' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, type: 'string' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="country"
                label="Country"
                rules={[{ required: true, type: 'string' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
