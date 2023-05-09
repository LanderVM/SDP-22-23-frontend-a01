import {
  // eslint-disable-next-line no-unused-vars
  Button, Col, Form, Input, InputNumber, Modal, Row,
} from 'antd';
import React, { useState } from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import './modal.scss';

export default function ChangeAddressModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const size0 = 0;
  const { lg } = useBreakpoint();
  const fontSizeMini = lg ? '18px' : '14px';
  // const widthText = lg ? '50%' : '20%';
  // const widthNumber = lg ? '100px' : '50px';

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
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
          <Form.Item
            label="Street name"
            name="streetName"
            rules={[{ required: true, type: 'string' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="House"
            name="houseNumber"
            rules={[{ required: true, type: 'number' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Bus"
            name="busNumber"
            rules={[{ required: false, type: 'number' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Bus"
            name="busNumber"
            rules={[{ required: false, type: 'number' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Bus"
            name="busNumber"
            rules={[{ required: false, type: 'number' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Bus"
            name="busNumber"
            rules={[{ required: false, type: 'number' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
