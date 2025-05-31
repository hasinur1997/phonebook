import { Modal, Descriptions, Avatar, Tooltip, message } from 'antd';
import { UserOutlined, CopyOutlined, CheckOutlined } from '@ant-design/icons';
import { useState } from '@wordpress/element';

const defaultImage = 'https://via.placeholder.com/100?text=Avatar';

const listStyle = {
  margin: 0,
  paddingLeft: 20,
  listStyleType: 'disc',
};

const CopyableField = ({ value, isArray = false }) => {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const displayText = isArray ? value.join(', ') : value || '';

  const copyToClipboard = (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed"; // avoid scrolling
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand("copy");
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
      }
      document.body.removeChild(textarea);
      return Promise.resolve();
    }
  };

  const handleCopy = () => {
    copyToClipboard(displayText).then(() => {
      setCopied(true);
      message.success('Copied!');
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', paddingRight: 24 }}
    >
      {isArray ? (
        <ul style={listStyle}>
          {value.map((val, i) => (
            <li key={i}>{val}</li>
          ))}
        </ul>
      ) : (
        <span>{value}</span>
      )}

      {hovered && (
        <div style={{ position: 'absolute', top: 0, right: 0 }}>
          {copied ? (
            <Tooltip title="Copied">
              <CheckOutlined style={{ color: 'green' }} />
            </Tooltip>
          ) : (
            <Tooltip title="Copy">
              <CopyOutlined
                style={{ cursor: 'pointer', color: '#1890ff' }}
                onClick={handleCopy}
              />
            </Tooltip>
          )}
        </div>
      )}
    </div>
  );
};

const ContactViewModal = ({ visible, onClose, contact }) => (
  <Modal title={null} open={visible} onCancel={onClose} footer={null}>
    {contact && (
      <>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <Avatar
            src={contact.image || defaultImage}
            size={80}
            icon={<UserOutlined />}
            style={{ marginRight: 16 }}
          />
          <h2 style={{ margin: 0 }}>{contact.name}</h2>
        </div>

        <Descriptions bordered column={1}>
          <Descriptions.Item label="Email" labelStyle={{ verticalAlign: 'top' }}>
            <CopyableField value={contact.email} isArray />
          </Descriptions.Item>
          <Descriptions.Item label="Phone" labelStyle={{ verticalAlign: 'top' }}>
            <CopyableField value={contact.phone} isArray />
          </Descriptions.Item>
          <Descriptions.Item label="Address" labelStyle={{ verticalAlign: 'top' }}>
            <CopyableField value={contact.address} isArray />
          </Descriptions.Item>
          <Descriptions.Item label="Company">
            <CopyableField value={contact.company} />
          </Descriptions.Item>
          <Descriptions.Item label="Job Title">
            <CopyableField value={contact.jobTitle} />
          </Descriptions.Item>
          <Descriptions.Item label="Type">
            <CopyableField value={contact.type} />
          </Descriptions.Item>
        </Descriptions>
      </>
    )}
  </Modal>
);

export default ContactViewModal;
