import {
  Button, Col, Form, Input, Modal, Row,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
// import { countries } from 'countries-list';
import React, { useState, useEffect } from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import './modal.scss';

export function ChangeAddressModal({ setAddressList, customerDetails }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();
  const [currentDetails, setCurrentDetails] = useState(customerDetails);
  const size0 = 0;
  const { lg } = useBreakpoint();
  const fontSizeMini = lg ? '18px' : '14px';

  useEffect(() => form.setFields([
    {
      name: 'delivery_street',
      value: currentDetails.delivery_street,
    },
    {
      name: 'delivery_house_number',
      value: currentDetails.delivery_house_number,
    },
    {
      name: 'delivery_box',
      value: currentDetails.delivery_box === 'null' ? '' : customerDetails.delivery_box,
    },
    {
      name: 'delivery_postal_code',
      value: currentDetails.delivery_postal_code,
    },
    {
      name: 'delivery_city',
      value: currentDetails.delivery_city,
    },
    {
      name: 'delivery_country',
      value: currentDetails.delivery_country,
    },
  ]), []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (values) => {
    setCurrentDetails(values);
    setAddressList(values);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div style={{ fontSize: fontSizeMini }}>
        <div>
          {currentDetails.supplier_delivery_street || currentDetails.delivery_street}
                              &nbsp;
          {currentDetails.supplier_delivery_house_number || currentDetails.delivery_house_number}
        </div>
        <div>
          {currentDetails.supplier_delivery_postal_code || currentDetails.delivery_postal_code}
                              &nbsp;
          {currentDetails.supplier_delivery_city || currentDetails.delivery_city}
        </div>
        <div>
          {currentDetails.supplier_delivery_country || currentDetails.delivery_country}
        </div>
      </div>
      <Button type="link" onClick={showModal} style={{ padding: size0, fontSize: fontSizeMini }}> &#62;&nbsp;Change address</Button>
      <Modal
        title="Change address"
        open={isModalOpen}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleOk(values);
            })
            .catch((info) => {
              console.log(info);
            });
        }}
        onCancel={handleCancel}
        width={700}
      >
        <Form
          name="basic"
          layout="vertical"
          form={form}
          initialValues={{ remember: true }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Form.Item
                name="delivery_street"
                label="Street"
                rules={[{ required: true, type: 'string' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="delivery_house_number"
                label="House Number"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="delivery_box"
                label="Bus"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Form.Item
                name="delivery_postal_code"
                label="Postal Code"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="delivery_city"
                label="City"
                rules={[{ required: true, type: 'string' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="delivery_country"
                label="Country"
                rules={[{ required: true }]}
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

export const ChangeAddressModalMemo = React.memo(ChangeAddressModal);
