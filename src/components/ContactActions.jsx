import { Button, Popconfirm, Space } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ContactActions = ({ record, onView, onEdit, onDelete }) => (
  <Space>
    <Button icon={<EyeOutlined />} onClick={() => onView(record)} />
    <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
    <Popconfirm title="Are you sure to delete this contact?" onConfirm={() => onDelete(record.key)}>
      <Button icon={<DeleteOutlined />} danger />
    </Popconfirm>
  </Space>
);

export default ContactActions;
