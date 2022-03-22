import React, { ReactNode } from 'react';
import { Layout } from 'antd';

import Navbar from 'components/layout/Navbar/Navbar';

import './BaseLayout.scss';

const { Content, Header } = Layout;

interface IBaseLayoutProps {
  children: ReactNode;
}

const BaseLayout: React.FC<IBaseLayoutProps> = ({ children }) => (
  <Layout className="ant-layout-custom">
    <Header className="custom-layout-header">
      <Navbar />
    </Header>
    <Content className="base-layout-content">{children}</Content>
  </Layout>
);

export default BaseLayout;
