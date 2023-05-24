import { useEffect, useState } from 'react';
import { List, Row, Col } from 'antd';
import useNotifications from '../../../api/notification';
import SingleNotification from './single-notification';
import Loader from '../../../Components/Loader';
import Error from '../../../Components/Error';

export default function NotificationsOverview() {
  const [notifications, setNotifications] = useState([]);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(null);

  const notificationsApi = useNotifications();

  useEffect(() => {
    const anArray = [];

    const updateNotifications = (array) => {
      const theObject = {
        notifications: array,
      };
      notificationsApi.saveMultipleToUnread(theObject);
    };

    const fetchAllNotifications = async () => {
      try {
        setLoading(true);
        const data = await notificationsApi.getAll();
        setNotifications(data);
        data.forEach((el) => {
          if (el.status === 'new') {
            anArray.push(el.notification_id);
          }
        });
        updateNotifications(anArray);
      } catch (error2) {
        setError(error2);
      } finally {
        setLoading(false);
      }
    };
    fetchAllNotifications();
  }, []);

  return (
    <div style={{ margin: '5% 15%' }}>
      <Loader loading={loading} />
      <Error error={error} />
      {!loading && !error
        ? (
          <>
            <h1 style={{ textAlign: 'center', fontSize: '2.3em' }}>All your notifications</h1>
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
                  Status
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
              pagination={{ pageSize: 10, align: 'center' }}
              dataSource={notifications}
              renderItem={(item) => (
                <List.Item key={item.notification_id} style={{ display: 'block', backgroundColor: item.status === 'new' || item.status === 'unread' ? 'white' : '#f5f5f5' }}>
                  <SingleNotification notification={item} />
                </List.Item>
              )}
            />
          </>
        ) : null}
    </div>
  );
}
