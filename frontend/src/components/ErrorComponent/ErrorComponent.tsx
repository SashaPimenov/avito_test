import styles from './ErrorComponent.module.css';

interface IErrorProps {
  message: string;
}

export const ErrorComponent = ({ message }: IErrorProps) => {
  return (
    <div className={styles.errorContainer}>
      <p>{message}</p>
    </div>
  );
};
