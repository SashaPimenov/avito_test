import { useState } from 'react';
import { TaskModal } from '../../components/TaskModal';
import { LoadingComponent } from '../../components/LoadingComponent';
import { ErrorComponent } from '../../components/ErrorComponent';
import { useAllBoards } from '../../hooks/api/boards';
import { useQueryClient } from '@tanstack/react-query';
import styles from './BoardsPage.module.css';
import { FORM_SOURCE } from '@constants/formSource';
import { BoardsList } from '@components/BoardsList';
import { Typography } from 'antd';

const BoardsPage = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState<number>();
  const queryClient = useQueryClient();

  const { data: boards, isLoading, isError } = useAllBoards();

  const handleCreateClick = (boardId: number) => {
    setSelectedBoardId(boardId);
    setFormOpen(true);
  };

  const handleTaskUpdated = () => {
    // Инвалидируем кеш для этого запроса, что вызовет автоматический рефетч при создании
    queryClient.invalidateQueries({ queryKey: ['boards'] });
  };

  if (isLoading) return <LoadingComponent />;
  if (isError) return <ErrorComponent message={'Упс... Уже чиним ошибку'} />;

  return (
    <div className={styles.container}>
      <Typography.Title level={2}>Все доски</Typography.Title>

      <BoardsList boards={boards!} handleCreateClick={handleCreateClick} />

      <TaskModal
        open={formOpen}
        onSuccess={handleTaskUpdated}
        source={FORM_SOURCE.BOARDS}
        onClose={() => {
          setFormOpen(false);
          setSelectedBoardId(undefined);
        }}
        boardId={selectedBoardId}
      />
    </div>
  );
};

export default BoardsPage;
