import { Button, Tag } from 'antd';
import { STATUSES_COLORS, PRIORITY_COLORS } from '../constants';
import { Assignee, Task } from '../api/types/task.type';

/**
 * Хук для получения столбцов задачи
 * @param onRowClick - каллбек для действия при нажатии на описание задачи
 */
export const useTableColumns = (onRowClick: (id: number) => void) => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Task) => (
        <Button type="link" onClick={() => onRowClick(record.id)} style={{ padding: 0 }}>
          {text}
        </Button>
      ),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: keyof typeof STATUSES_COLORS) => (
        <Tag color={STATUSES_COLORS[status]}>{status}</Tag>
      ),
    },
    {
      title: 'Приоритет',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: keyof typeof PRIORITY_COLORS) => (
        <Tag color={PRIORITY_COLORS[priority]}>{priority}</Tag>
      ),
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Доска',
      dataIndex: 'boardName',
      key: 'boardName',
    },
    {
      title: 'Ответственный',
      dataIndex: 'assignee',
      key: 'assignee',
      render: (assignee: Assignee) => <p>{assignee.fullName}</p>,
    },
  ];

  return columns;
};
