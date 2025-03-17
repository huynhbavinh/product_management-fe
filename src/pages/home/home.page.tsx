import React, { useEffect, useState } from 'react';
import { NotificationOutlined, PlusCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Tooltip, theme } from 'antd';
import './styles.css';
import ListComponent from '../../components/list/list.component';
import HeaderComponent from '../../components/header/header.component';
import CreatePostModal from '../../components/modal/CreatePostModal.component';
import axiosInstance from '../../api/http';

const { Content, Sider } = Layout;

const items2: MenuProps['items'] = [NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `${key}`,
      icon: React.createElement(icon),
      label: `News`,
    };
  },
);

function HomeComponent() {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reloadList, setReloadList] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get('users/profile');
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
    };
    if (localStorage.getItem('loggedIn')) {
      fetchData();
    }
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePostCreated = () => {
    setReloadList(reloadList + 1);
  };

  const handleLogout = () => {
    axiosInstance.post('users/logout');
    localStorage.removeItem('user');
    localStorage.removeItem('loggedIn');
    window.location.reload();
  };

  return (
    <Layout className='layout'>
      <HeaderComponent />
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
          <Menu
            mode="inline"
            style={{ position: 'absolute', bottom: 0, width: '100%' }}
          >
            <Menu.Item style={{
              display: user ? 'flex' : 'none',
            }} key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <div className='toolbar'>
            <Breadcrumb
              items={[{ title: 'Home' }, { title: 'News' }]}
              style={{ margin: '8px 0' }}
            />
            <Tooltip title="Add Post">
              <PlusCircleOutlined
                style={{
                  display: user ? 'flex' : 'none',
                }}
                className='add-new'
                onClick={handleOpenModal}
              />
            </Tooltip>
          </div>
          <Content
            style={{
              padding: '1rem',
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <ListComponent key={reloadList} />
          </Content>
        </Layout>
      </Layout>
      <CreatePostModal open={isModalOpen} onClose={handleCloseModal} onPostCreated={handlePostCreated} />
    </Layout>
  );
}

export default HomeComponent;