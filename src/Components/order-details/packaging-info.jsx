import {
  Button, Modal, Table,
} from 'antd';
import React, { useEffect, useState } from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import Error from '../Error';
import Loader from '../Loader';

import usePackagingApi from '../../api/packagingService';

// eslint-disable-next-line no-unused-vars
export default function PackagingInfo({ orderDetails, updateFunction, updatedOrderDetailsFunction }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackagingId, setSelectedPackagingId] = useState(orderDetails.packaging_id);
  const [currentPackagingName, setCurrentPackagingName] = useState(orderDetails.name);
  const [packaging, setPackaging] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const size0 = 0;
  const { lg } = useBreakpoint();
  const fontSizeMini = lg ? '18px' : '14px';
  const positionChangePackageMF = lg ? 'absolute' : 'relative';
  const fontSizeDesc = lg ? '24px' : '18px';
  const packagingApi = usePackagingApi();

  useEffect(() => {
    const fetchPackaging = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await packagingApi.getPackaging();
        setPackaging(data.items);
      } catch (error2) {
        setError(error2);
      } finally {
        setLoading(false);
      }
    };
    fetchPackaging();
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
          const updatedDetails = await updateFunction(orderDetails.order_id, selectedPackagingId);
          setCurrentPackagingName(updatedDetails.items.packaging_name);
        // } else if (updatedOrderDetailsFunction) {
        //   updatedOrderDetailsFunction(toUpdateValues);
        //   setCurrentDetails(toUpdateValues);
        // } else {
        //   setCurrentDetails(toUpdateValues);
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
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedPackagingId(selectedRowKeys[0]);
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
            defaultSelectedRowKeys: [orderDetails.packaging_id],
            ...rowSelection,
          }}
          columns={columns}
          dataSource={packaging}
          rowKey="packaging_id"
        />
      </Modal>
    </>
  );
}
