import { Table, Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ContactActions from './ContactActions';

const { Option } = Select;

const ContactTable = ({
  contacts,
  onView,
  onEdit,
  onDelete,
  searchText,
  setSearchText,
  typeFilter,
  setTypeFilter,
  pagination,
  setPagination,
  sorter,
  setSorter,
  total
}) => {
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', sorter: true },
    { title: 'Email', dataIndex: 'email', key: 'email', render: (emails) => emails?.[0], sorter: true },
    { title: 'Phone', dataIndex: 'phone', key: 'phone', render: (phones) => phones?.[0], sorter: true },
    { title: 'Type', dataIndex: 'type', key: 'type', sorter: true },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <ContactActions record={record} onView={onView} onEdit={onEdit} onDelete={onDelete} />
      ),
    },
  ];

  const filteredContacts = contacts.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(searchText.toLowerCase());
    const matchType = typeFilter ? c.type === typeFilter : true;
    return matchSearch && matchType;
  });

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (!sorter.order) return 0;
    const valA = a[sorter.field];
    const valB = b[sorter.field];
    if (valA < valB) return sorter.order === 'ascend' ? -1 : 1;
    if (valA > valB) return sorter.order === 'ascend' ? 1 : -1;
    return 0;
  });

  const paginatedContacts = sortedContacts.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );

  return (
    <>
      <Space style={{ margin: '16px 0' }}>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search by name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          style={{ width: 300, height: 40 }} // Set same width & height
        />
        <Select
          placeholder="Filter by type"
          allowClear
          onChange={setTypeFilter}
          style={{ width: 200, height: 40 }} // Match width & height to Input
          value={typeFilter}
        >
          <Option value="">Select Type</Option>
          <Option value="Personal">Personal</Option>
          <Option value="Work">Work</Option>
        </Select>
      </Space>

      <Table
        columns={columns}
        dataSource={contacts}
        pagination={{
          ...pagination,
          total: total, // Needed for proper page count
        }}
        onChange={(pag, filters, sort) => {
          setPagination({
            ...pagination,
            current: pag.current,
            pageSize: pag.pageSize,
          });
          setSorter(sort);
        }}
        rowClassName={() => 'cursor-pointer'}
        rowKey="id"
      />
    </>
  );
};

export default ContactTable;
