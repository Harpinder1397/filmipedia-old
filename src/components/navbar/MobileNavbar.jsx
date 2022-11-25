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



const items = [
  getItem('Timeline', '/timeline'),
  getItem('Jobs', '/jobs'),
  getItem('Applications', '/job/applications'),
  getItem('Database', '/database'),
//   getItem('Messages', '/messages',),
  getItem('My Info', '/my-profile'),
  getItem('Shortlisted', '/shortlisted'),
  getItem('Admin', '/admin'),
  getItem('Sign Out', '/signOut'),
//   getItem('Option 3', '3', <ContainerOutlined />),
//   getItem('Navigation One', 'sub1', <MailOutlined />, [
//     getItem('Option 5', '5'),
//     getItem('Option 6', '6'),
//     getItem('Option 7', '7'),
//     getItem('Option 8', '8'),
//   ]),
//   getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
//     getItem('Option 9', '9'),
//     getItem('Option 10', '10'),
//     getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
//   ]),
];

const item2 = [
    getItem('Database', '/database'),
    getItem('Sign Up', '/register',),
    getItem('Sign in', '/signin',),
  //   getItem('Option 3', '3', <ContainerOutlined />),
  //   getItem('Navigation One', 'sub1', <MailOutlined />, [
  //     getItem('Option 5', '5'),
  //     getItem('Option 6', '6'),
  //     getItem('Option 7', '7'),
  //     getItem('Option 8', '8'),
  //   ]),
  //   getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
  //     getItem('Option 9', '9'),
  //     getItem('Option 10', '10'),
  //     getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  //   ]),
  ];
const MobileNavbar = ({collapsed, setCollapsed, handleOnClick}) => {
    const isAuthorized = localStorage.getItem('token');

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
        items={isAuthorized ? items : item2}
      />
    </div>
  );
};
export default MobileNavbar;