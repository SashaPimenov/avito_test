import { Alert, Button, Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import { FrownOutlined } from '@ant-design/icons';
import styles from './ErrorPage.module.css';

const { Title, Text } = Typography;

export const ErrorPage = () => {
  return (
    <div className={styles.container}>
      <Card className={styles.errorCard}>
        <div className={styles.content}>
          <FrownOutlined className={styles.errorIcon} />

          <Title level={2} >
            Упс! Ошибка
          </Title>

          <Alert
            message="Что-то пошло не так"
            description={
              <Text type="secondary">
                Приносим извинения за неудобства. Наша команда уже знает о проблеме
              </Text>
            }
            type="error"
            showIcon
            className={styles.errorAlert}
          />

          <Link to={ROUTES.BOARDS}>
            <Button type="primary" size="large">
              Вернуться на главную
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};
