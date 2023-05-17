import {
  Button, Modal, Table,
} from 'antd';
import React, { useState } from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export function ChangePackagingModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackaging, setSelectedPackaging] = useState(null);
  const size0 = 0;
  const { lg } = useBreakpoint();
  const fontSizeMini = lg ? '18px' : '14px';
  const positionChangePackageMF = lg ? 'absolute' : 'relative';

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
      console.log(selectedPackaging);
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

  return (
    <>
      <div style={{ fontSize: fontSizeMini }}>
        <div>
          {}
        </div>
      </div>
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
          rowKey="packaging_id"

        />
      </Modal>
    </>
  );
}

export const ChangePackagingModalMemo = React.memo(ChangePackagingModal);
