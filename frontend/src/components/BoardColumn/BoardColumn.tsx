import { Task } from '@api/types/task.type';
import { TaskCard } from '@components/TaskCard';
import { STATUSES_COLORS } from 'src/constants/statusesColors';
import { Status } from 'src/types';
import styles from './BoardColumn.module.css';
import { Typography } from 'antd';

interface BoardColumnProps {
  status: string;
  title: string;
  tasks: Task[];
  handleOpenTaskEdit: (id: number) => void;
}
export const BoardColumn = ({ status, title, tasks, handleOpenTaskEdit }: BoardColumnProps) => {
  return (
    <div className={styles.boardColumn}>
      <Typography.Title level={4} style={{ color: STATUSES_COLORS[status as Status] }}>
        {title}
      </Typography.Title>

      <div className={styles.tasksContainer}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} handleOpenTaskEdit={handleOpenTaskEdit} />
        ))}
      </div>
    </div>
  );
};
