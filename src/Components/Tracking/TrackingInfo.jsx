import { Steps, Table } from 'antd';
import React from 'react';

const columns = [
  {
    title: 'Order Date',
    dataIndex: 'order_date',
    key: 'order_date',
  },
  {
    title: 'Shipped By',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Status',
    dataIndex: 'order_status',
    key: 'order_status',
  },
  {
    title: 'Tracking Code',
    dataIndex: 'tracking_code',
    key: 'tracking_code',
  },
];

export default function TrackingInfo({ tracker }) {
  if (tracker === null) return null;

  return (
    <>
      <Table
        columns={columns}
        dataSource={[tracker.items]}
        bordered
        pagination={false}
        className="delaware-tracking-infotable"
      />
      <Steps
        className="delaware-tracking-steps"
        current={tracker.items.order_status}
        items={[
          {
            title: 'Placed',
          },
          {
            title: 'Processed',
          },
          {
            title: 'Shipped',
          },
          {
            title: 'Out for Delivery',
          },
          {
            title: 'Delivered',
          },
        ]}
      />
    </>
  );
}
