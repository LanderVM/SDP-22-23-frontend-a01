import { useEffect, useState } from 'react';
import { List, Row, Col } from 'antd';
import useNotifications from '../../api/notification';
import SingleNotification from './SingleNotification';
import Loader from '../Loader';
import Error from '../Error';

export default function MostRecentNotifications() {
  const [fiveMostRecentNotifications, setFiveMostRecentNotifications] = useState([]);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(null);

  const notificationsApi = useNotifications();

  useEffect(() => {
    const fetchFiveMostRecent = async () => {
      try {
        setLoading(true);
        const data = await notificationsApi.getFiveMostRecent();
        setFiveMostRecentNotifications(data);
      } catch (error2) {
        setError(error2);
      } finally {
        setLoading(false);
      }
    };
    fetchFiveMostRecent();
  }, []);

  return (
    <div style={{ margin: '5% 15%' }}>
      <Loader loading={loading} />
      <Error error={error} />
      <h1>Your five most recent notifications</h1>
      <List
        header={
          (
            <div style={{ fontWeight: '500', fontSize: '1.2em', textAlign: 'center' }}>
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
            <SingleNotification notification={item} />
          </List.Item>
        )}
      />
    </div>
  );
}
