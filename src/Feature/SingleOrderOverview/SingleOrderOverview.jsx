import { Content } from 'antd/es/layout/layout';
import { Breadcrumb, Layout } from 'antd';

import SingleOrderInfo from './SingleOrderInfo';
import SideMenu from '../../Components/Sider/SideMenu';

export default function SingleOrderOverview() {
  const order = [{
    order_id: 4,
    order_date: '2023-04-15',
    order_status: 2,
    product_id: 5,
    image_URL: 'https://i.dummyjson.com/data/products/5/thumbnail.jpg',
    name: 'Huawei P30',
  }, {
    order_id: 4,
    order_date: '2023-04-15',
    order_status: 2,
    product_id: 5,
    image_URL: 'https://i.dummyjson.com/data/products/5/thumbnail.jpg',
    name: 'Test P30',
  }];

  return (
    <Content style={{ padding: '0 32px' }}>
      <Breadcrumb style={{ marginTop: '16px' }}>
        <Breadcrumb.Item>Account</Breadcrumb.Item>
        <Breadcrumb.Item>Orders</Breadcrumb.Item>
      </Breadcrumb>
      <Layout>
        <SideMenu />
        <Content style={{
          margin: '0 14px', minHeight: 280,
        }}
        >
          <h1 style={{ fontSize: '48px', margin: '0' }}>Order 254555</h1>

          <SingleOrderInfo key={order[0].order_id} productList={order} />

        </Content>
      </Layout>
    </Content>
  );
}
