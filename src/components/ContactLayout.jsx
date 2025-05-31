import { Layout, Menu } from 'antd';
import { ContactsOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const ContactLayout = ({ children }) => (
  <Layout style={{ minHeight: '100vh' }}>

    <Layout>
      <Content style={{ margin: '16px' }}>{children}</Content>
    </Layout>
  </Layout>
);

export default ContactLayout;
