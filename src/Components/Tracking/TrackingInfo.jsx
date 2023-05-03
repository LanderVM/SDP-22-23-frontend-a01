import Table from 'ant-responsive-table';
import { Steps } from 'antd';
import React from 'react';
import {
  MdDeliveryDining, MdPlace,
} from 'react-icons/md';
import {
  IoMdBoat, IoMdCheckmark,
} from 'react-icons/io';
import {
  BsBoxSeam,
} from 'react-icons/bs';
import moment from 'moment/moment';
import getStatusAsString from '../../utils';

const columns = [
  {
    title: 'Order Date',
    dataIndex: 'order_date',
    key: 'order_date',
    showOnResponse: true,
    showOnDesktop: true,
  },
  {
    title: 'Shipped By',
    dataIndex: 'name',
    key: 'name',
    showOnResponse: true,
    showOnDesktop: true,
  },
  {
    title: 'Status',
    dataIndex: 'order_status',
    key: 'order_status',
    showOnResponse: true,
    showOnDesktop: true,
  },
  {
    title: 'Tracking Code',
    dataIndex: 'tracking_code',
    key: 'tracking_code',
    showOnResponse: true,
    showOnDesktop: true,
  },
];

export default function TrackingInfo({ tracker }) {
  if (tracker === null) return null;

  const dataSource = [
    {
      key: tracker.items.tracking_code,
      order_date: moment(tracker.items.order_date.split('T')[0]).format('MMMM Do YYYY'),
      name: tracker.items.name,
      order_status: getStatusAsString(tracker.items.order_status),
      tracking_code: tracker.items.tracking_code,
    },
  ];

  return (
    <>
      <Table
        antTableProps={{
          showHeader: true,
          columns,
          dataSource,
          pagination: false,
        }}
        mobileBreakPoint={768}
        className="delaware-tracking-infotable"
      />
      <Steps
        data-cy="status_steps"
        className="delaware-tracking-steps"
        current={tracker.items.order_status}
        items={[
          {
            title: 'Placed',
            status: 'placed',
            icon: <IoMdCheckmark />,
          },
          {
            title: 'Processed',
            status: 'processed',
            icon: <BsBoxSeam />,
          },
          {
            title: 'Shipped',
            status: 'shipped',
            icon: <IoMdBoat />,
          },
          {
            title: 'Out for Delivery',
            status: 'outfordelivery',
            icon: <MdDeliveryDining />,
          },
          {
            title: 'Delivered',
            status: 'delivered',
            icon: <MdPlace />,
          },
        ]}
      />
    </>
  );
}
