import { Drawer, Form, Input, Button, Select } from 'antd';
import ContactFormListField from './ContactFormListField';
import {__} from '@wordpress/i18n';

const { Option } = Select;

const ContactDrawerForm = ({ visible, onClose, form, onSubmit, editingContactKey }) => (
  <Drawer
    title={editingContactKey ? __('Edit Contact', 'text-domain') : __('Create Contact', 'phonebook')}
    width={360}
    onClose={onClose}
    open={visible}
    styles={{
      body: {
        paddingBottom: 80,
        maxHeight: 'calc(100vh - 60px)',
        overflowY: 'auto',
      },
      header: {
        paddingTop: '32px',
      },
    }}
    style={{ marginTop: '32px' }}
  >
    <Form layout="vertical" form={form} onFinish={onSubmit}>
      <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter name' }]}>
        <Input />
      </Form.Item>

      <ContactFormListField name="email" label="Email" placeholder="Email" type="email" />
      <ContactFormListField name="phone" label="Phone" placeholder="Phone" />
      <ContactFormListField name="address" label="Address" placeholder="Address" />

      <Form.Item name="company" label="Company">
        <Input />
      </Form.Item>
      <Form.Item name="jobTitle" label="Job Title">
        <Input />
      </Form.Item>
      <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please select type' }]}>
        <Select placeholder="Select type">
          <Option value="Personal">Personal</Option>
          <Option value="Work">Work</Option>
          <Option value="Other">Other</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {editingContactKey ? 'Update' : 'Save'}
        </Button>
      </Form.Item>
    </Form>
  </Drawer>
);

export default ContactDrawerForm;
