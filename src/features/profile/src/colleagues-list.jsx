import {
  List,
} from 'antd';
import SingleColleague from './single-colleague';

export default function ColleaguesList({ colleagues }) {
  return (
    <List
      header={<div style={{ fontWeight: '600', fontSize: '16px' }}>Colleagues</div>}
      bordered
      itemLayout="horizontal"
      pagination={{ pageSize: 5, align: 'center' }}
      style={{ backgroundColor: 'white' }}
      dataSource={colleagues}
      renderItem={(item) => (
        <List.Item key={item.email} style={{ display: 'block' }}>
          <SingleColleague colleague={item} />
        </List.Item>
      )}
    />
  );
}
