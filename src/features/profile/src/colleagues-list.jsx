import {
  List,
} from 'antd';
import SingleColleague from './single-colleague';

export default function ColleaguesList({ colleagues }) {
  return (
    <List
      header={<div style={{ fontWeight: '500', fontSize: '1.2em' }}>Colleagues</div>}
      bordered
      itemLayout="horizontal"
      pagination={{ pageSize: 5, align: 'center' }}
      dataSource={colleagues}
      renderItem={(item) => (
        <List.Item key={item.email} style={{ display: 'block' }}>
          <SingleColleague colleague={item} />
        </List.Item>
      )}
    />
  );
}
