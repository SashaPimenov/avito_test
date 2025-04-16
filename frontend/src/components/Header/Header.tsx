import { PlusOutlined } from '@ant-design/icons';
import { TaskForm } from '@components/TaskForm/TaskForm';
import { ROUTES } from '@const/routes';
import { Layout, Typography, Menu, Button } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

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
          items={[
            { key: 'boards', label: <Link to={ROUTES.BOARDS}>Все доски</Link> },
            { key: 'issues', label: <Link to={ROUTES.TASKS}>Все задачи</Link> },
          ]}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setFormOpen(true)}>
          Создать задачу
        </Button>
      </Layout.Header>
      <TaskForm
        open={formOpen}
        onSuccess={() => null}
        onClose={() => setFormOpen(false)}
        source="header"
      />
    </>
  );
};
