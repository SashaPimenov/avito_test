import { Task } from '@api/types/task.type';
import { Card, Typography } from 'antd';
import styles from './TaskCard.module.css';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useRef, useEffect } from 'react';

interface TaskCardProps {
  task: Task;
  handleOpenTaskEdit: (id: number) => void;
}

/**
 * Компонент для отображения задачи
 * @param task Задача
 * @param handleOpenTaskEdit Колбэк для редактирования задачи
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
        element.style.cursor = 'grab';
      },
    });
  }, [task.id, task.status]);
  return (
    <div ref={ref} className={styles.issueWrapper} onClick={() => handleOpenTaskEdit(task.id)}>
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
