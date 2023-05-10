import {
  Button, Col, Form, Input, Modal, Row, Select,
} from 'antd';
import React, { useEffect, useState } from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import './modal.scss';
import { useForm } from 'antd/es/form/Form';
import { countries } from 'countries-list';
import useOrderApi from '../../api/orderService';
import Error from '../../Components/Error';

export function ChangeAddressModal({ orderDetails }) {
  if (orderDetails.order_status !== 0) return null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentDetails, setCurrentDetails] = useState(orderDetails);
  const size0 = 0;
  const { lg } = useBreakpoint();
  const fontSizeMini = lg ? '18px' : '14px';
  const orderApi = useOrderApi();
  const [form] = useForm();

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
      value: currentDetails.delivery_box === 'null' ? '' : orderDetails.delivery_box,
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
    setLoading(null);
    setIsModalOpen(true);
  };
  const handleOk = (values) => {
    const updateOrder = async () => {
      try {
        setError(null);
        setLoading(true);
        const updatedDetails = await orderApi.updateShippingDetailsById(orderDetails.order_id, values);
        setCurrentDetails(updatedDetails.items);
        setLoading(false);
        setIsModalOpen(false);
      } catch (error2) {
        setError(error2);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    updateOrder();
  };

  const handleCancel = () => {
    setError(null);
    setLoading(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        {currentDetails.delivery_street}
      &nbsp;
        {currentDetails.delivery_house_number}
        {currentDetails.delivery_box === '' || currentDetails.delivery_box === null ? '' : `, Box ${currentDetails.delivery_box}`}
      </div>
      <div>
        {currentDetails.delivery_postal_code}
        &nbsp;
        {currentDetails.delivery_city}
      </div>
      <div>
        {currentDetails.delivery_country}
      </div>
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
                rules={[{ required: true }]}
              >
                <Select showSearch>
                  {Object.values(countries).map((country) => (
                    <Select.Option
                      title={country.name}
                      key={country.name}
                      value={country.name}
                    >
                      {country.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export const ChangeAddressModalMemo = React.memo(ChangeAddressModal);
