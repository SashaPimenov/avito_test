import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { useAllBoards } from '@hooks/api/boards';
import { useAllUsers } from '@hooks/api/users';
import { Space, Input, Select, Button } from 'antd';
import { useFilters } from 'src/contexts/FiltersContext/FiltersContext';
import styles from './TaskFilters.module.css';

export const TaskFilters = () => {
  const { filters, updateFilter, resetFilters } = useFilters();
  const { data: users, isLoading: userLoading } = useAllUsers();
  const { data: boards, isLoading: boardsLoading } = useAllBoards();

  return (
    <Space className={styles.container}>
      <Input
        placeholder="Найти задачу..."
        prefix={<SearchOutlined />}
        value={filters.searchTerm}
        onChange={(e) => updateFilter('searchTerm', e.target.value)}
        className={styles.input}
      />

      <Select
        value={filters.statusFilter}
        className={styles.select}
        onChange={(value) => updateFilter('statusFilter', value)}
        placeholder="Статус"
      >
        <Select.Option value="all">Все статусы</Select.Option>
        <Select.Option value="Backlog">Backlog</Select.Option>
        <Select.Option value="InProgress">InProgress</Select.Option>
        <Select.Option value="Done">Done</Select.Option>
      </Select>

      <Select
        value={filters.priorityFilter}
        className={styles.select}
        onChange={(value) => updateFilter('priorityFilter', value)}
        placeholder="Приоритет"
      >
        <Select.Option value="all">Все приоритеты</Select.Option>
        <Select.Option value="Low">Low</Select.Option>
        <Select.Option value="Medium">Medium</Select.Option>
        <Select.Option value="High">High</Select.Option>
      </Select>

      <Select
        value={filters.assigneeFilter}
        className={styles.select}
        loading={userLoading}
        onChange={(value) => updateFilter('assigneeFilter', value)}
        placeholder="Ответственный"
      >
        <Select.Option value="all">Все пользователи</Select.Option>
        {users?.map((user) => (
          <Select.Option key={user.id} value={user.id.toString()}>
            {user.fullName}
          </Select.Option>
        ))}
      </Select>

      <Select
        value={filters.boardFilter}
        className={styles.select}
        loading={boardsLoading}
        onChange={(value) => updateFilter('boardFilter', value)}
        placeholder="Доски"
      >
        <Select.Option value="all">Все доски</Select.Option>
        {boards?.map((board) => (
          <Select.Option key={board.id} value={board.name}>
            {board.name}
          </Select.Option>
        ))}
      </Select>

      <Button icon={<ReloadOutlined />} onClick={resetFilters}>
        Сбросить
      </Button>
    </Space>
  );
};
