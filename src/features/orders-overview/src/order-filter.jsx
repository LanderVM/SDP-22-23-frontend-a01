import React, { useState, useEffect } from 'react';

import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

const statusesValuesList = [
  {
    name: 'Placed',
    value: 0,
  },
  {
    name: 'Processed',
    value: 1,
  },
  {
    name: 'Shipped',
    value: 2,
  },
  {
    name: 'Out for Delivery',
    value: 3,
  },
  {
    name: 'Delivered',
    value: 4,
  },
];
export default function OrderFilter(props) {
  const { handleCallback } = props;

  const [statusesChecked, setStatusesChecked] = useState([]);

  const onStatusCheckChange = (checkedValues) => {
    const values = statusesValuesList.filter((i) => checkedValues.includes(i.name));
    setStatusesChecked(values.map((e) => e.value));
  };

  useEffect(() => {
    handleCallback({ statusesChecked });
  }, [statusesChecked]);

  return (
    <Collapse bordered={false} defaultActiveKey={['status']} className="sideBar">
      <Panel header="Order Status" key="status">
        <Checkbox.Group options={statusesValuesList.map((e) => e.name)} onChange={onStatusCheckChange} />
      </Panel>
    </Collapse>
  );
}
