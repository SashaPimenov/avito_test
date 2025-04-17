import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BoardColumns } from '../../components/BoardColumns';
import { LoadingComponent } from '../../components/LoadingComponent';
import { ErrorComponent } from '../../components/ErrorComponent';
import { Task } from '../../api/types/task.type';
import { useBoardById } from '../../hooks/api/boards';
import { TaskForm } from '@components/TaskForm';
import { useQueryClient } from '@tanstack/react-query';
import { message, Typography } from 'antd';
import styles from './BoardPage.module.css';
import { FORM_SOURCE } from '@constants/formSource';
import { Status } from 'src/types';
import { useUpdateTaskStatus } from '@hooks/api/tasks';

const BoardPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedIssueId, setSelectedIssueId] = useState<number>();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

  const boardId = parseInt(id || '');
  if (isNaN(boardId)) {
    navigate('/not-found');
  }

  const { data: boardsTasks, isLoading, isError } = useBoardById(boardId);
  const { mutate: changeStatusMutate } = useUpdateTaskStatus();

  useEffect(() => {
    if (boardsTasks) {
      setTasks(boardsTasks);
    }
  }, [boardsTasks]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('taskId');

    if (taskId) {
      setSelectedIssueId(Number(taskId));
    }
  }, [location.search]);

  const handleOpenTaskEdit = (id: number) => {
    setSelectedIssueId(id);
  };

  const clearQueryParams = () => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.delete('taskId');
    queryParams.delete('target');
    navigate(`${location.pathname}`, { replace: true }); // Обновляем URL если перешли со страницы задач
  };

  const handleTaskUpdated = () => {
    // Инвалидируем кеш для этого запроса, что вызовет автоматический рефетч
    queryClient.invalidateQueries({ queryKey: ['board', boardId] });
  };

  if (isLoading) return <LoadingComponent />;
  if (isError) return <ErrorComponent message="Упс... Уже чиним ошибку" />;

  const handleTaskMove = async (taskId: number, newStatus: Status) => {
    try {
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)),
      );
      changeStatusMutate({ taskId, status: newStatus });
      messageApi.success('Статус задачи изменен');

      queryClient.invalidateQueries({ queryKey: ['board', boardId] });
    } catch (error) {
      console.log(error);
      setTasks(tasks);
    }
  };

  return (
    <div className={styles.boardPage}>
      {contextHolder}
      <div className={styles.boardHeader}>
        <Typography.Title level={2} className={styles.boardTitle}>
          Доска № {id}
        </Typography.Title>
      </div>

      <BoardColumns
        tasks={tasks}
        handleOpenTaskEdit={handleOpenTaskEdit}
        onTaskMove={handleTaskMove}
      />
      <TaskForm
        open={!!selectedIssueId}
        source={FORM_SOURCE.BOARD}
        onClose={() => {
          clearQueryParams();
          setSelectedIssueId(undefined);
        }}
        onSuccess={handleTaskUpdated}
        issueId={selectedIssueId}
      />
    </div>
  );
};

export default BoardPage;
