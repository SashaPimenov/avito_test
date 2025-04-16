import { Row } from 'antd';
import { BoardColumn } from '../BoardColumn/BoardColumn';
import { Task } from '../../api/types/task.type';
import { STATUSES_TITLES } from '../../const';
import styles from './BoardColumns.module.css';

interface BoardColumnsProps {
  tasks: Task[];
  handleOpenTaskEdit: (id: number) => void;
}

export const BoardColumns = ({ tasks, handleOpenTaskEdit }: BoardColumnsProps) => {
  return (
    <Row gutter={16} className={styles.boardColumns}>
      {Object.entries(STATUSES_TITLES).map(([status, title]) => (
        <BoardColumn
          key={status}
          status={status}
          title={title}
          tasks={tasks.filter((task) => task.status === status)}
          handleOpenTaskEdit={handleOpenTaskEdit}
        />
      ))}
    </Row>
  );
};
