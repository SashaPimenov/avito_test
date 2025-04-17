import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import { Header } from '@components/Header';

const { Content } = Layout;

/**
 * Компонент лайаута для всех страниц
 * @example
 * <AppLayout />
 */
export const AppLayout = () => {
  return (
    <Layout className={styles.layoutContainer}>
      <Header />
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  );
};
