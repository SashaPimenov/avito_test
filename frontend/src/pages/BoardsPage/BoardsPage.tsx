import { Card, List, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { TaskForm } from '../../components/TaskForm';
import { LoadingComponent } from '../../components/LoadingComponent';
import { ErrorComponent } from '../../components/ErrorComponent';
import { useAllBoards } from '../../hooks/api/boards';
import { ROUTES } from 'src/constants/routes';
import { useQueryClient } from '@tanstack/react-query';
import styles from './BoardsPage.module.css';

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

      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
        dataSource={boards}
        renderItem={(board) => (
          <List.Item>
            <Card
              title={board.name}
              extra={
                <Button type="link" onClick={() => handleCreateClick(board.id)}>
                  Добавить задачу
                </Button>
              }
              actions={[<Link to={`${ROUTES.BOARD}/${board.id}`}>Посмотреть доску</Link>]}
            >
              <p>{board.description}</p>
              <p>Количество задач: {board.taskCount}</p>
            </Card>
          </List.Item>
        )}
      />

      {formOpen && (
        <TaskForm
          open={formOpen}
          onSuccess={handleTaskUpdated}
          source="boards"
          onClose={() => {
            setFormOpen(false);
            setSelectedBoardId(undefined);
          }}
          boardId={selectedBoardId}
        />
      )}
    </div>
  );
};

export default BoardsPage;
