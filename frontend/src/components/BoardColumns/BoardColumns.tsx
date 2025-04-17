import { Row } from 'antd';
import { BoardColumn } from '../BoardColumn';
import { Task } from '../../api/types/task.type';
import { STATUSES_TITLES } from '../../constants';
import styles from './BoardColumns.module.css';
import { Status } from 'src/types';

interface IBoardColumnsProps {
  tasks: Task[];
  handleOpenTaskEdit: (id: number) => void;
  onTaskMove: (taskId: number, newStatus: Status) => void;
}

/**
 * Компонент-контейнер для отображения колонок доски (Kanban-доска).
 * Автоматически распределяет задачи по колонкам на основе их статуса.
 * @param tasks Массив всех задач
 * @param handleOpenTaskEdit Колбэк для редактирования задачи
 */
export const BoardColumns = ({ tasks, handleOpenTaskEdit, onTaskMove }: IBoardColumnsProps) => {
  return (
    <Row gutter={16} className={styles.boardColumns}>
      {Object.entries(STATUSES_TITLES).map(([status, title]) => {
        const filteredTasks = tasks.filter((task) => task.status === status);

        return (
          <BoardColumn
            key={status}
            status={status as Status}
            title={title}
            tasks={filteredTasks}
            onTaskMove={onTaskMove}
            handleOpenTaskEdit={handleOpenTaskEdit}
          />
        );
      })}
    </Row>
  );
};
