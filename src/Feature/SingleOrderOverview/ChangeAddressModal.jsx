import {
  Button, Col, Form, Input, Modal, Row,
} from 'antd';
import React, { useEffect, useState } from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import './modal.scss';
import { useForm } from 'antd/es/form/Form';
import useOrderApi from '../../api/orderService';
import Error from '../../Components/Error';

export function ChangeAddressModal({ orderDetails }) {
  if (orderDetails.order_status !== 0) return null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const size0 = 0;
  const { lg } = useBreakpoint();
  const fontSizeMini = lg ? '18px' : '14px';
  // eslint-disable-next-line no-unused-vars
  const orderApi = useOrderApi();

  const [form] = useForm();
  useEffect(() => form.setFields([
    {
      name: 'delivery_street',
      value: orderDetails.delivery_street,
    },
    {
      name: 'delivery_house_number',
      value: orderDetails.delivery_house_number,
    },
    {
      name: 'delivery_box',
      value: orderDetails.delivery_box === 'null' ? '' : orderDetails.delivery_box,
    },
    {
      name: 'delivery_postal_code',
      value: orderDetails.delivery_postal_code,
    },
    {
      name: 'delivery_city',
      value: orderDetails.delivery_city,
    },
    {
      name: 'delivery_country',
      value: orderDetails.delivery_country,
    },
  ]), []);

  const showModal = () => {
    setLoading(null);
    setIsModalOpen(true);
  };
  const handleOk = (values) => {
    const updateOrder = async () => {
      try {
        console.log(`0 ${error}`);
        setError(null);
        setLoading(true);
        const newDetails = await orderApi.updateShippingDetailsById(orderDetails.order_id, values);
        console.log(newDetails);
      } catch (error2) {
        console.log(`1 ${error}`);
        console.log(`1_2 ${error2}`);
        setError(error2);
        console.log(`2 ${error}`);
      } finally {
        console.log(`3 ${error}`);
      }
    };
    updateOrder();
    setTimeout(() => {
      if (error === null) setIsModalOpen(false);
      setLoading(false);
    }, 0);
  };

  const handleCancel = () => {
    setError(null);
    setLoading(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="link" onClick={showModal} style={{ padding: size0, fontSize: fontSizeMini }}> &#62;&nbsp;Change address</Button>
      <Modal
        title="Change address"
        okText="Update"
        cancelText="Cancel"
        open={isModalOpen}
        confirmLoading={loading}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleOk(values);
            })
            .catch((info) => {
              setError(info);
            });
        }}
        onCancel={handleCancel}
        width={700}
      >
        <Error error={error} />
        <Form
          form={form}
          name="basic"
          layout="vertical"
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
                label="Box"
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

export const ChangeAddressModalMemo = React.memo(ChangeAddressModal);
