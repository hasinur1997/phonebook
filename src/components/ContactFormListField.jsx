import { Form, Input, Button, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
const { TextArea } = Input;


const ContactFormListField = ({ name, label, placeholder, type = 'text' }) => (
  <Form.List
    name={name}
    rules={[
      {
        validator: async (_, items) => {
          if (!items || items.length < 1 || !items[0]) {
            throw new Error(`At least one ${label.toLowerCase()} is required`);
          }
        },
      },
    ]}
  >
    {(fields, { add, remove }) => (
      <>
        <label>{label}</label>
        {fields.map((field, index) => (
          console.log(field, index),
          <Form.Item
            key={field.key}
            required={index === 0}
            rules={index === 0 ? [{ required: true, message: `Please input ${label.toLowerCase()}` }] : []}
            style={{ width: '100%' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Form.Item
                {...field}
                style={{ flex: 1, marginBottom: 0 }} // flex: 1 makes it take available space
              >
                {
                  name === 'email' ? (
                    <Input type="email" placeholder={placeholder} style={{ width: '100%' }} />
                  ) : name === 'phone' ? (
                    <Input type="tel" placeholder={placeholder} style={{ width: '100%' }}/>
                  ) : name === 'address' ? (
                    <TextArea rows={2} placeholder={placeholder} style={{ width: '100%' }} />
                  ) : (
                    <Input type={type} placeholder={placeholder} style={{ width: '100%' }} />
                  )
                }
              </Form.Item>

              {fields.length > 1 && (
                <MinusCircleOutlined onClick={() => remove(field.name)} style={{ color: 'red', fontSize: 18, cursor: 'pointer' }} />
              )}
            </div>
             
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
            Add {label}
          </Button>
        </Form.Item>
      </>
    )}
  </Form.List>
);

export default ContactFormListField;
