import { useEffect, useState } from 'react';
import { List, Row, Col } from 'antd';
import useNotifications from '../../api/notification';
import SingleNotification from './SingleNotification';

export default function MostRecentNotifications() {
  const [fiveMostRecentNotifications, setFiveMostRecentNotifications] = useState([]);

  const notificationsApi = useNotifications();

  useEffect(() => {
    const fetchFiveMostRecent = async () => {
      const data = await notificationsApi.getFiveMostRecent();
      console.log(data);
      setFiveMostRecentNotifications(data);
      console.log(fiveMostRecentNotifications);
    };
    fetchFiveMostRecent();
  }, []);

  return (
    <div style={{ margin: '5% 15%' }}>

      <List
        header={
          (
            <div style={{ fontWeight: '500', fontSize: '1.2em' }}>
              <Row>
                <Col span={6}>
                  Date
                </Col>
                <Col span={6}>
                  Description
                </Col>
                <Col span={6}>
                  Satus
                </Col>
                <Col span={6}>
                  OrderId
                </Col>
              </Row>
            </div>
          )
        }
        bordered
        itemLayout="horizontal"
        dataSource={fiveMostRecentNotifications}
        renderItem={(item) => (
          <List.Item key={item.notification_id} style={{ display: 'block' }}>
            <SingleNotification notifcation={item} />
          </List.Item>
        )}
      />
    </div>
  );
}
