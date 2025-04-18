import { Task } from '@api/types/task.DTO';
import { Card, Tag, Typography, Avatar } from 'antd';
import styles from './TaskCard.module.css';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useRef, useEffect } from 'react';
import { PRIORITY_COLORS } from '@constants/priorityColors';
import { Priority } from 'src/types';

interface TaskCardProps {
  task: Task;
  handleOpenTaskEdit: (id: number) => void;
}

/**
 * Компонент отображения одной карточке в колонке
 * @param task - объект задачи
 * @param handleOpenTaskEdit - каллбек для редактировани
 */

export const TaskCard = ({ task, handleOpenTaskEdit }: TaskCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return draggable({
      element,
      getInitialData: () => ({
        taskId: task.id.toString(),
        currentStatus: task.status,
      }),
      onDragStart: () => {
        element.style.opacity = '0.5';
        element.style.cursor = 'grabbing';
      },
      onDrop: () => {
        element.style.opacity = '1';
        element.style.cursor = '';
      },
    });
  }, [task.id, task.status]);

  return (
    <div ref={ref} className={styles.taskWrapper} onClick={() => handleOpenTaskEdit(task.id)}>
      <Card className={styles.taskCard}>
        <Typography.Title level={5} className={styles.taskTitle}>
          {task.title}
        </Typography.Title>
        <p>
          Приоритет: <Tag color={PRIORITY_COLORS[task.priority as Priority]}>{task.priority}</Tag>
        </p>
        <div className={styles.assigneeContainer}>
          <span className={styles.assigneeLabel}>Ответственный:</span>
          <Avatar size="small" className={styles.assigneeAvatar}>
            {task.assignee.fullName.charAt(0)}
          </Avatar>
          <span className={styles.assigneeName}>{task.assignee.fullName}</span>
        </div>
      </Card>
    </div>
  );
};
