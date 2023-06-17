import {
  Button, Modal, Table,
} from 'antd';
import React, { useEffect, useState } from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { CheckCircleOutlined } from '@ant-design/icons';
import Error from '../error';
import Loader from '../loader';
import './modal.css';

import usePackagingApi from '../../api/packaging-service';
import ToastNotification from '../notification';

export default function PackagingInfo({ orderDetails, updateFunction, updatedOrderDetailsFunction }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackaging, setSelectedPackaging] = useState({ packaging_id: orderDetails.packaging_id });
  const [currentPackagingName, setCurrentPackagingName] = useState(undefined);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [packaging, setPackaging] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const size0 = 0;
  const { lg } = useBreakpoint();
  const fontSizeMini = lg ? '18px' : '14px';
  const positionChangePackageMF = lg ? 'absolute' : 'relative';
  const fontSizeDesc = lg ? '24px' : '18px';
  const packagingApi = usePackagingApi();

  const toastNotification = (
    <ToastNotification
      title="Packaging Updated"
      message={
            (
              <>
                Your&nbsp;
                <span style={{ fontWeight: 'bold' }}>packaging</span>
                  &nbsp;has been updated.
              </>
            )
          }
      icon={(
        <CheckCircleOutlined
          style={{
            color: '#ff4d4f',
          }}
        />
          )}
      show={notificationVisible}
    />
  );

  useEffect(() => {
    const fetchPackaging = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await packagingApi.getPackagingsList();
        setPackaging(data.items);
        if (selectedPackaging.packaging_id === undefined) {
          setSelectedPackaging(data.items[0]);
          setCurrentPackagingName(data.items[0].packaging_name);
        } else {
          setCurrentPackagingName(orderDetails.name);
        }
      } catch (error2) {
        setError(error2);
      } finally {
        setLoading(false);
      }
    };
    const setDefaultPackaging = () => {
      updatedOrderDetailsFunction(selectedPackaging);
    };
    fetchPackaging();
    if (updatedOrderDetailsFunction) setDefaultPackaging();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const updateOrder = async () => {
      try {
        setError(null);
        setLoading(true);
        if (updateFunction) {
          const updatedDetails = await updateFunction(orderDetails.order_id, selectedPackaging.packaging_id);
          setCurrentPackagingName(updatedDetails.items.packaging_name);
        } else if (updatedOrderDetailsFunction) {
          updatedOrderDetailsFunction(selectedPackaging);
          setCurrentPackagingName(selectedPackaging.packaging_name);
        } else {
          setCurrentPackagingName(selectedPackaging.packaging_name);
        }
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
    setNotificationVisible(true);
    setTimeout(() => setNotificationVisible(false));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedPackaging(selectedRows[0]);
    },
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'packaging_name',
      width: '30%',
    },
    {
      title: 'Measurements\nLen x Wid x Hei\n(in cm)',
      dataIndex: 'measurements',
      width: '40%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '20%',
    },
  ];

  return (
    <>
      {toastNotification}
      <h1 style={{ fontSize: fontSizeDesc }}>Packaging</h1>
      <div style={{ fontSize: fontSizeMini }}>{currentPackagingName}</div>
      { (orderDetails.order_status === 0 || orderDetails.order_status === undefined)
        ? (
          <Button
            style={{
              position: positionChangePackageMF, bottom: size0, padding: size0, fontSize: fontSizeMini,
            }}
            type="link"
            onClick={showModal}
          >
            &#62;&nbsp;Change packaging
          </Button>
        )
        : null}
      {
        selectedPackaging.packaging_id === undefined ? null
          : (
            <Modal
              forceRender
              title="Change Packaging"
              style={{ whiteSpace: 'pre' }}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Loader loading={loading} />
              <Error error={error} />
              <Table
                rowSelection={{
                  type: 'radio',
                  defaultSelectedRowKeys: [selectedPackaging.packaging_id],
                  ...rowSelection,
                }}
                columns={columns}
                dataSource={packaging}
                rowKey="packaging_id"
              />
            </Modal>
          )
      }
    </>
  );
}
