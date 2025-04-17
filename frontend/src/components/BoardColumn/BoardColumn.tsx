import { Task } from '@api/types/task.DTO';
import { TaskCard } from '@components/TaskCard';
import { STATUSES_COLORS } from 'src/constants/statusesColors';
import { Status } from 'src/types';
import styles from './BoardColumn.module.css';
import { Typography } from 'antd';
import { useRef, useEffect, useState } from 'react';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

interface IBoardColumnProps {
  status: Status;
  title: string;
  tasks: Task[];
  onTaskMove: (taskId: number, newStatus: Status) => void;
  handleOpenTaskEdit: (id: number) => void;
}

/**
 * Компонент колонки доски задач
 * Отображает статус и список задач.
 * @param status Статус колонки (определяет цвет заголовка)
 * @param title Название колонки
 * @param tasks Массив задач
 * @param handleOpenTaskEdit Колбэк для редактирования задачи
 */
export const BoardColumn = ({
  status,
  title,
  tasks,
  onTaskMove,
  handleOpenTaskEdit,
}: IBoardColumnProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return dropTargetForElements({
      element,
      onDragEnter: () => {
        setIsDraggedOver(true);
      },
      onDragLeave: () => {
        setIsDraggedOver(false);
      },
      onDrop: ({ source }) => {
        setIsDraggedOver(false);
        const taskId = parseInt(source.data.taskId as string);
        const sourceStatus = source.data.currentStatus;
        if (!isNaN(taskId) && sourceStatus !== status) {
          onTaskMove(taskId, status);
        }
      },
      getData: () => ({ status }),
    });
  }, [status, onTaskMove]);

  return (
    <div ref={ref} className={`${styles.boardColumn} ${isDraggedOver && styles.draggedOver}`}>
      <Typography.Title level={4} style={{ color: STATUSES_COLORS[status] }}>
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
