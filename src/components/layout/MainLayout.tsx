import { Outlet } from 'react-router';
import { Layout } from '@/components/ui';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';

const { Content, Footer } = Layout;

import { useUIStore } from '@/stores/uiStore';

export function MainLayout() {
  const { navType } = useUIStore();

  return (
    <Layout hasSider={navType === 'sidebar'}>
      {navType === 'sidebar' && <Sidebar />}
      <Layout>
        {navType === 'topbar' ? (
          <div className="sticky top-0 z-10 template-navbar">
            <Header variant="topbar" />
            <TopBar variant="topbar" />
          </div>
        ) : (
          <Header variant="sidebar" />
        )}
        <Content className="m-6 template-content">
          <Outlet />
        </Content>
        <Footer className="text-center bg-bg-secondary text-gray-500 template-footer">
          Flux Dashboard ©{new Date().getFullYear()} Created by Brayan Salgado
        </Footer>
      </Layout>
    </Layout>
  );
}
