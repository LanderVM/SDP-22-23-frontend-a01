import { Row, Col } from 'antd';

export default function SingleNotification({ notification }) {
  return (
    <div>
      <Row>
        <Col span={6}>
          <p>{notification.notification_date}</p>
        </Col>
        <Col span={6}>
          <p>{notification.message}</p>
        </Col>
        <Col span={6}>
          <p>{notification.status}</p>
        </Col>
        <Col span={6}>
          <p>{notification.order_id}</p>
        </Col>
      </Row>
    </div>
  );
}
