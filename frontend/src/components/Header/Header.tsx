import { AppstoreOutlined, PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { TaskModal } from '@components/TaskModal';
import { Layout, Typography, Menu, Button } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { FORM_SOURCE } from '@constants/formSource';
import { ROUTES } from '@constants/routes';

/**
 * Компонент шапки приложения с навигацией и кнопкой создания задачи
 * @example
 * <Header />
 */
export const Header = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <Layout.Header className={styles.headerContainer}>
        <Typography.Title
          level={4}
          style={{
            color: 'white',
            margin: 0,
          }}
        >
          Хочу в Авито
        </Typography.Title>
        <Menu
          theme="dark"
          mode="horizontal"
          className={styles.menuItems}
          selectedKeys={[]}
          items={[
            {
              key: 'boards',
              label: <Link to={ROUTES.BOARDS}>Все доски</Link>,
              icon: <AppstoreOutlined />,
            },
            {
              key: 'issues',
              label: <Link to={ROUTES.TASKS}>Все задачи</Link>,
              icon: <UnorderedListOutlined />,
            },
          ]}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setFormOpen(true)}>
          Создать задачу
        </Button>
      </Layout.Header>
      <TaskModal
        open={formOpen}
        onSuccess={() => null}
        onClose={() => setFormOpen(false)}
        source={FORM_SOURCE.HEADER}
      />
    </>
  );
};
