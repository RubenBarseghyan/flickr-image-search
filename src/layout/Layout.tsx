import React from 'react';
import { Layout } from 'antd';
import StickyHeader from '../components/Header';

const { Content, Footer } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <StickyHeader />
      <Layout>
        <Content style={{marginTop: 64}}>
          <div>{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Image Gallery</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
