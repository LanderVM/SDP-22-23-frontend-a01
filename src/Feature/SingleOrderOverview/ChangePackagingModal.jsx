import {
  Button, Modal, Table,
} from 'antd';
import React, { useState } from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export default function ChangePackagingModal() {
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
  const data = [
    {
      key: 1,
      packaging_id: 1,
      height: 5.5,
      length: 6.6,
      width: 4,
      name: 'Medium',
      price: 10,
    },
    {
      key: 2,
      packaging_id: 2,
      height: 4.5,
      length: 4.5,
      width: 3,
      name: 'Medium',
      price: 30,
    },
    {
      key: 3,
      packaging_id: 3,
      height: 4.5,
      length: 6.6,
      width: 5,
      name: 'MediumOld',
      price: 14,
    },
    {
      key: 4,
      packaging_id: 4,
      height: 3,
      length: 2,
      width: 2,
      name: 'Small',
      price: 15,
    },
  ];
  // TODO
  return (
    <>
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
          dataSource={data}

        />
      </Modal>
    </>
  );
}
