import { Task } from '@api/types/task.type';
import { Card, Typography } from 'antd';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  handleOpenTaskEdit: (id: number) => void;
}

export const TaskCard = ({ task, handleOpenTaskEdit }: TaskCardProps) => {
  return (
    <div className={styles.issueWrapper} onClick={() => handleOpenTaskEdit(task.id)}>
      <Card className={styles.issueCard}>
        <Typography.Title level={5} className={styles.issueTitle}>
          {task.title}
        </Typography.Title>
        <p className={styles.issuePriority}>Приоритет: {task.priority}</p>
        <p className={styles.issueAssignee}>Ответственный: {task.assignee.fullName}</p>
      </Card>
    </div>
  );
};
