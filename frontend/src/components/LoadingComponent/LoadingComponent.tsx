import { Spin } from 'antd';
import styles from './LoadingComponent.module.css';

/**
 * Компонент для отображения лоадера.
 */
export const LoadingComponent = () => {
  return (
    <div className={styles.loadingContainer}>
      <Spin size="large" />
    </div>
  );
};
