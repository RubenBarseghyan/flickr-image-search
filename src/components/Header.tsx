import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const StickyHeader: React.FC = () => {
  const menuItems = [
    {
      key: '1',
      label: <Link to="/">Home</Link>,
    },
    {
      key: '2',
      label: <Link to="/favorites">Favorites</Link>,
    },
  ];

  return (
    <Header className="site-layout-background" style={{ padding: 0, position: 'sticky', top: 0, zIndex: 1000 }}>
      <Menu theme="dark" mode="horizontal" items={menuItems} />
    </Header>
  );
};

export default StickyHeader;
