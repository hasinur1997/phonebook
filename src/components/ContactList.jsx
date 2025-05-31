import { useState, useEffect } from '@wordpress/element';
import { Button, message, Form, Layout } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

import ContactLayout from './ContactLayout';
import ContactTable from './ContactTable';
import ContactDrawerForm from './ContactDrawerForm';
import ContactViewModal from './ContactViewModal';
import data from '../data.json';

const { Header, Sider, Content } = Layout;

const ContactList = () => {
  const [contacts, setContacts] = useState(data);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [editingContactKey, setEditingContactKey] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '20', '50'],
  });

  const [sorter, setSorter] = useState({});

  const [form] = Form.useForm();

  const openCreateDrawer = () => {
    form.resetFields();
    setEditingContactKey(null);
    setDrawerVisible(true);
  };

  const openEditDrawer = (contact) => {
    form.setFieldsValue(contact);
    setEditingContactKey(contact.key);
    setDrawerVisible(true);
  };

  const handleSubmit = (values) => {
    if (editingContactKey) {
      setContacts((prev) =>
        prev.map((c) => (c.key === editingContactKey ? { ...c, ...values } : c))
      );
      message.success('Contact updated successfully');
    } else {
      const newKey = (contacts.length + 1).toString();
      setContacts((prev) => [...prev, { key: newKey, ...values }]);
      message.success('Contact created successfully');
    }
    setDrawerVisible(false);
  };

  const handleDelete = (key) => {
    setContacts((prev) => prev.filter((c) => c.key !== key));
    message.success('Contact deleted');
  };

  const handleView = (contact) => {
    setSelectedContact(contact);
    setViewModalVisible(true);
  };

  const closeViewModal = () => {
    setViewModalVisible(false);
    setSelectedContact(null);
  };

  return (
    <ContactLayout>
      

        <Header style={{ background: '#fff', padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h2 style={{ margin: 0 }}>Contacts</h2>
          <Button type="primary" icon={<UserAddOutlined />} onClick={openCreateDrawer} style={{  }}>
                Add Contact
            </Button>
        </Header>

      <ContactTable
        contacts={contacts}
        onView={handleView}
        onEdit={openEditDrawer}
        onDelete={handleDelete}
        searchText={searchText}
        setSearchText={setSearchText}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        pagination={pagination}
        setPagination={setPagination}
        sorter={sorter}
        setSorter={setSorter}
      />

      <ContactDrawerForm
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        form={form}
        onSubmit={handleSubmit}
        editingContactKey={editingContactKey}
      />

      <ContactViewModal visible={viewModalVisible} onClose={closeViewModal} contact={selectedContact} />
    </ContactLayout>
  );
};

export default ContactList;
