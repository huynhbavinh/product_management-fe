import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
const { Header } = Layout;
import './styles.css';
import AvatarComponent from '../avatar/avatar.component';

function HeaderComponent() {
  const [logedIn, setLogedIn] = React.useState(false);
  const navigator = useNavigate();
  const handleStorageChange = () => {
    const user = localStorage.getItem('user') || localStorage.getItem('loggedIn');
    setLogedIn(!!user);
  };
  useEffect(() => {
    

    window.addEventListener('storage', handleStorageChange);

    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Header className='header' style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      {
        logedIn 
          ? <AvatarComponent />
          : <div onClick={()=> {
            navigator('/login');
          }} className='login'>
              <UserOutlined style={{ fontSize: '1.5rem' }} />
              <Link to="/login" style={{ marginLeft: '1rem' }}>Login</Link>
            </div>
      }
    </Header>
  );
}

export default HeaderComponent;