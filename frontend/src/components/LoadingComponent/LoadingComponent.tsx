import { Spin } from 'antd';
import styles from './LoadingComponent.module.css';

export const LoadingComponent = () => {
  return (
    <div className={styles.loadingContainer}>
      <Spin size="large" />
    </div>
  );
};
