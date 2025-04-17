import styles from './ErrorComponent.module.css';

interface IErrorProps {
  message: string;
}

/**
 * Компонент для отображения сообщений об ошибках.
 * @param message Сообщение об ошибке
 */
export const ErrorComponent = ({ message }: IErrorProps) => {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorText}>{message}</p>
    </div>
  );
};
