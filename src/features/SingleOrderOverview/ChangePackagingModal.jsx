import {
  Button, Modal, Table,
} from 'antd';
import React, { useEffect, useState } from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import Error from '../../Components/Error';
import Loader from '../../Components/Loader';

import usePackagingApi from '../../api/packagingService';

export function ChangePackagingModal({ orderDetails }) {
  if (orderDetails.order_status !== 0) return null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedPackaging, setSelectedPackaging] = useState(null);
  const [packaging, setPackaging] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const size0 = 0;
  const { lg } = useBreakpoint();
  const fontSizeMini = lg ? '18px' : '14px';
  const positionChangePackageMF = lg ? 'absolute' : 'relative';
  const packagingApi = usePackagingApi();

  useEffect(() => {
    const fetchPackaging = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await packagingApi.getPackagingsList();
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
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedPackaging(selectedRowKeys[0]);
    },
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',

    },
    {
      title: 'Measurements  L x W x H  \n'
          + '(in cm)',
      dataIndex: 'width',

    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
  ];

  // TODO
  return (
    <>
      <Loader loading={loading} />
      <Error error={error} />
      <Button
        style={{
          position: positionChangePackageMF, bottom: size0, padding: size0, fontSize: fontSizeMini,
        }}
        type="link"
        onClick={showModal}
      >
        &#62;&nbsp;Change packaging
      </Button>
      <Modal
        forceRender
        title="Change packaging"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}

      >
        <Table
          rowSelection={{
            type: 'radio',
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

export const ChangePackagingModalMemo = React.memo(ChangePackagingModal);
