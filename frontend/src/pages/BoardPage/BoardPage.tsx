/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BoardColumns } from '../../components/BoardColumns/BoardColumns';
import { LoadingComponent } from '../../components/LoadingComponent/LoadingComponent';
import { ErrorComponent } from '../../components/ErrorComponent/ErrorComponent';
import Title from 'antd/es/typography/Title';
import { Task } from '../../api/types/task.type';
import { useBoardById } from '../../hooks/api/boards';
import { TaskForm } from '@components/TaskForm/TaskForm';
import { useQueryClient } from '@tanstack/react-query';
import styles from './BoardPage.module.css';

const BoardPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedIssueId, setSelectedIssueId] = useState<number>();
  const queryClient = useQueryClient();

  const boardId = parseInt(id || '');
  if (isNaN(boardId)) {
    navigate('/not-found');
    return null;
  }

  const { data: boardsTasks, isLoading, isError } = useBoardById(boardId);

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
    navigate(`${location.pathname}`, { replace: true }); // Обновляем URL
  };

  const handleTaskUpdated = () => {
    // Инвалидируем кеш для этого запроса, что вызовет автоматический рефетч
    queryClient.invalidateQueries({ queryKey: ['board', boardId] });
  };

  if (isLoading) return <LoadingComponent />;
  if (isError) return <ErrorComponent message="Упс... Уже чиним ошибку" />;

  return (
    <div className={styles.boardPage}>
      <div className={styles.boardHeader}>
        <Title level={2} className={styles.boardTitle}>
          Доска № {id}
        </Title>
      </div>

      <BoardColumns tasks={tasks} handleOpenTaskEdit={handleOpenTaskEdit} />
      <TaskForm
        open={!!selectedIssueId}
        source="board"
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
