import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
import { ROUTES } from '@constants/routes';
const NotFoundPage = () => {
  return (
    <Result
      className={styles.containter}
      status="404"
      title="404"
      subTitle="Страница не найдена. Возможно, вы ввели неправильный адрес."
      extra={
        <Link to={ROUTES.BOARDS}>
          <Button type="primary">На главную</Button>
        </Link>
      }
    />
  );
};

export default NotFoundPage;
