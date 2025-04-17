import React from 'react';
import { List, Card, Button, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { getTaskCountColor } from '@utils/getTaskCountColor';
import { Board } from '@api/types/board.DTO';
import { ROUTES } from '@constants/routes';
import styles from './BoardsList.module.css';

interface BoardsListProps {
  boards: Board[];
  handleCreateClick: (boardId: number) => void;
}

/**
 * Компонент для отображения списка досок
 * @param boards Массив досок
 * @param handleCreateClick Колбэк для создания задачи
 */
export const BoardsList: React.FC<BoardsListProps> = ({ boards, handleCreateClick }) => {
  return (
    <List
      grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
      dataSource={boards}
      renderItem={(board) => (
        <List.Item>
          <Card
            hoverable
            className={styles.card}
            title={<span className={styles.title}>{board.name}</span>}
            extra={
              <Button
                type="link"
                onClick={() => handleCreateClick(board.id)}
                style={{ padding: 0 }}
              >
                Добавить задачу
              </Button>
            }
            actions={[
              <Link to={`${ROUTES.BOARD}/${board.id}`} className={styles.actionsButton}>
                Посмотреть доску
              </Link>,
            ]}
          >
            <p>{board.description}</p>
            <p>
              Количество задач:{' '}
              <Tag color={getTaskCountColor(board.taskCount)}>{board.taskCount}</Tag>
            </p>
          </Card>
        </List.Item>
      )}
    />
  );
};
