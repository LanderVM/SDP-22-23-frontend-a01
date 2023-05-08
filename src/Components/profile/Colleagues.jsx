import {
  List,
} from 'antd';
import ColleagueInfo from './ColleagueInfo';

export default function Colleagues({ colleagues }) {
  return (
    <List
      header={<div style={{ fontWeight: '500', fontSize: '1.2em' }}>Colleagues</div>}
      bordered
      itemLayout="horizontal"
      pagination={{ pageSize: 5, align: 'center' }}
      dataSource={colleagues}
      renderItem={(item) => (
        <List.Item key={item.email} style={{ display: 'block' }}>
          <ColleagueInfo colleague={item} />
        </List.Item>
      )}
    />
  );
}
