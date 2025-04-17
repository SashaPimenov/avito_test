import { Button, Table, Typography } from 'antd';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { PlusOutlined } from '@ant-design/icons';
import { ErrorComponent } from '@components/ErrorComponent';
import { LoadingComponent } from '@components/LoadingComponent';
import { TaskFilters } from '@components/TaskFilters';
import { TaskForm } from '@components/TaskForm';
import { useTableColumns } from '@hooks/useTableColumns';
import { useAllTasks } from '@hooks/api/tasks';
import { FiltersProvider, useFilters } from '@contexts/FiltersContext';
import styles from './TasksPage.module.css';
import { FORM_SOURCE } from '@constants/formSource';

const TasksPageContent = () => {
  const [selectedIssueId, setSelectedIssueId] = useState<number>();
  const [formOpen, setFormOpen] = useState(false);

  const { filteredTasks } = useFilters();
  const queryClient = useQueryClient();

  const columns = useTableColumns((id) => setSelectedIssueId(id));

  const handleTaskUpdated = () => {
    // Инвалидируем кеш для этого запроса, что вызовет автоматический рефетч при создании
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
  };

  return (
    <div className={styles.container}>
      <Typography.Title level={2}>Все задачи</Typography.Title>
      <div className={styles.filtersContainer}>
        <TaskFilters />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setFormOpen(true)}>
          Создать задачу
        </Button>
      </div>
      <Table columns={columns} dataSource={filteredTasks} rowKey="id" bordered />
      <TaskForm
        open={!!selectedIssueId || formOpen}
        source={FORM_SOURCE.TASKS}
        onSuccess={handleTaskUpdated}
        onClose={() => {
          setSelectedIssueId(undefined);
          setFormOpen(false);
        }}
        issueId={selectedIssueId}
      />
    </div>
  );
};

const TasksPage = () => {
  const { data: tasks, isLoading, isError } = useAllTasks();
  if (isLoading) return <LoadingComponent />;
  if (isError) return <ErrorComponent message="Упс... Уже чиним ошибку" />;

  return (
    <FiltersProvider tasks={tasks}>
      <TasksPageContent />
    </FiltersProvider>
  );
};

export default TasksPage;
