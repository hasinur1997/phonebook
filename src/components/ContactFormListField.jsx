import { useEffect } from 'react';
import { Form, Input, Button, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const ContactFormListField = ({ name, label, placeholder, type = 'text' }) => {
  const [form] = Form.useForm();

  // Automatically add one item on mount
  useEffect(() => {
    const list = form.getFieldValue(name);
    if (!list || list.length === 0) {
      form.setFieldsValue({ [name]: [''] });
    }
  }, [form, name]);

  return (
    <Form.Item noStyle shouldUpdate>
      {({ getFieldValue, setFieldsValue }) => {
        const list = getFieldValue(name) || [];

        return (
          <Form.List
            name={name}
            rules={[
              {
                validator: async (_, items) => {
                  if (!items || items.length === 0 || !items[0]) {
                    return Promise.reject(new Error(`At least one ${label.toLowerCase()} is required`));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            {(fields, { add, remove }) => (
              <>
                <label>{label}</label>

                {fields.length === 0 && add()}

                {fields.map((field, index) => (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          message: `Please input ${label.toLowerCase()}`,
                        },
                      ]}
                      style={{ flex: 1 }}
                    >
                      {name === 'email' ? (
                        <Input type="email" placeholder={placeholder}  style={{ width: '100%' }}/>
                      ) : name === 'phone' ? (
                        <Input type="tel" placeholder={placeholder} style={{ width: '100%' }}/>
                      ) : name === 'address' ? (
                        <TextArea rows={2} placeholder={placeholder} style={{ width: '100%' }} />
                      ) : (
                        <Input type={type} placeholder={placeholder} style={{ width: '100%' }} />
                      )}
                    </Form.Item>

                    {fields.length > 1 && (
                      <MinusCircleOutlined
                        onClick={() => remove(field.name)}
                        style={{ color: 'red', fontSize: 18, cursor: 'pointer', marginTop: 8 }}
                      />
                    )}
                  </div>
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
      }}
    </Form.Item>
  );
};

export default ContactFormListField;
