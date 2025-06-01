import { useState, useEffect } from '@wordpress/element';
import { Button, message, Form, Layout } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

import ContactLayout from './ContactLayout';
import ContactTable from './ContactTable';
import ContactDrawerForm from './ContactDrawerForm';
import ContactViewModal from './ContactViewModal';
import contactApi from '../api/contactApi'; // Adjust the import path as necessary

const { Header, Sider, Content } = Layout;

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
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
    pageSizeOptions: ['1', '2', '5', '10', '20', '50'],
  });

  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);


  const [sorter, setSorter] = useState({});

  const [form] = Form.useForm();

  const openCreateDrawer = () => {
    form.resetFields();
    setEditingContactKey(null);
    setDrawerVisible(true);
  };

  const openEditDrawer = (contact) => {
    form.setFieldsValue(contact);
    setEditingContactKey(contact.id);
    setDrawerVisible(true);
  };

  const handleSubmit = async (values) => {
    if (editingContactKey) {
        updateContact(values);
    } else {
      createContact(values)
    }
    setDrawerVisible(false);
  };

  const updateContact = async (data) => {
    setLoading(true);
    try {
      const res = await contactApi.update(editingContactKey, data);
      setContacts((prev) =>
        prev.map((c) => (c.id === editingContactKey ? { ...c, ...res.data } : c))
      );
    } catch(error) {
      message.error('Failed to update contact');
    }finally {
      
      message.success('Contact updated successfully');
      setLoading(false);
    }
  }

  const createContact = async (data) => {
    setLoading(true);
    try {
      const res = await contactApi.create(data);
      setContacts((prev) => [...prev, { id: res.data.id, ...data }]);
    } catch(error) {
      message.error('Failed to create contact');
    }finally {
      message.success('Contact created successfully');
      setLoading(false);
    }
  }

  const handleDelete = (id) => {
    setLoading(true);
    try {
      const res = contactApi.delete(id);
    } catch(error) {
      message.error('Failed to create contact');
    }finally {
      setContacts((prev) => prev.filter((c) => c.id !== id));
      message.success('Contact deleted');
      setLoading(false);
    }
  };

  const handleView = (contact) => {
    setSelectedContact(contact);
    setViewModalVisible(true);
  };

  const closeViewModal = () => {
    setViewModalVisible(false);
    setSelectedContact(null);
  };

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const response = await contactApi.all({
          page: pagination.current,
          per_page: pagination.pageSize,
          search: searchText,
          orderby: sorter.field,
          order: sorter.order === 'ascend' ? 'asc' : 'desc',
          filter: typeFilter,
        });

        // console.log('Fetched contacts:', response); // Debugging log
        setContacts(response.data); // If your API wraps response in `data`
        setTotal(response.total);   // Make sure your API sends this
      } catch (error) {
        message.error('Failed to fetch contacts');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [pagination, sorter, searchText, typeFilter]);


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
        total={total}
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
