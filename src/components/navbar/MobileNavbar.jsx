import React, { useState } from 'react';
import {
  AppstoreOutlined,
  CloseOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}



const userMenu = [
  getItem('Timeline', '/timeline'),
  getItem('Jobs', '/jobs'),
  getItem('Applications', '/job/applications'),
  getItem('Database', '/database'),
  getItem('My Info', '/my-profile'),
  getItem('Shortlisted', '/shortlisted'),
  getItem('Sign Out', '/signOut')
];

const AdminMenu = [
  getItem('Timeline', '/timeline'),
  getItem('Jobs', '/jobs'),
  getItem('Applications', '/job/applications'),
  getItem('Database', '/database'),
  getItem('My Info', '/my-profile'),
  getItem('Shortlisted', '/shortlisted'),
  getItem('Admin', '/admin'),
  getItem('Sign Out', '/signOut')
];

const item2 = [
    getItem('Database', '/database'),
    getItem('Sign Up', '/register',),
    getItem('Sign in', '/signin',),
  ];
const MobileNavbar = ({collapsed, setCollapsed, handleOnClick}) => {
    const isAuthorized = localStorage.getItem('token');
    const userType  = localStorage.getItem("userType");
    const navbarList = userType == 'admin' ? AdminMenu : userMenu
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  
  return (
    <div
      style={{
        width: "100%",
      }}
      className="mobile-navbar-container"
    >
      <Button
        type="primary"
        className='menu-icon-button'
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <CloseOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        style={{ display: !collapsed ?  "none" : "" }}
        // inlineCollapsed={collapsed}
        onClick={handleOnClick}
        items={isAuthorized ? navbarList : item2}
      />
    </div>
  );
};
export default MobileNavbar;