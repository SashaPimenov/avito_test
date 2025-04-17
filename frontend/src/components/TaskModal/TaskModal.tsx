import { CreateTaskForm } from '@components/CreateTaskForm';
import { LoadingComponent } from '@components/LoadingComponent';
import { UpdateTaskForm } from '@components/UpdateTaskForm';
import { useAllBoards } from '@hooks/api/boards';
import { useTaskById, useCreateTask, useUpdateTask } from '@hooks/api/tasks';
import { useAllUsers } from '@hooks/api/users';
import { message, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import { CreateTaskFormValues, TaskModalProps, UpdateTaskFormValues } from './types';

/**
 * Компонент-контейнер, который отображает
 * форму создания или редактирования в зависимости от входных данных
 */
export const TaskModal = ({
  open,
  onClose,
  taskId,
  onSuccess,
  source,
  boardId,
}: TaskModalProps) => {
  const { data: users, isPending: usersPending } = useAllUsers({ enabled: open });
  const { data: currentTask, isPending: taskPending } = useTaskById(taskId!);
  const { data: boards, isPending: boardsPending } = useAllBoards({ enabled: open });
  const navigate = useNavigate();
  const { mutate: createTaskMutation, isPending: createTaskPending } = useCreateTask();
  const { mutate: updateTaskMutation, isPending: updateTaskPending } = useUpdateTask();
  const [messageApi, contextHolder] = message.useMessage();

  const isLoading = usersPending || boardsPending || Boolean(taskId && taskPending);

  const handleCreate = async (data: CreateTaskFormValues) => {
    try {
      createTaskMutation({
        task: {
          title: data.title,
          description: data.description,
          priority: data.priority,
          assigneeId: data.assigneeId,
          boardId: data.boardId,
        },
      });
      onSuccess?.();
      messageApi.success('Задача создана');
      navigate(`${ROUTES.BOARD}/${data.boardId}`);
      onClose();
    } catch (error) {
      console.error('Ошибка при создании задачи', error);
    }
  };

  const handleUpdate = async (data: UpdateTaskFormValues) => {
    try {
      updateTaskMutation({
        taskId: taskId!,
        task: data,
      });
      onSuccess?.();
      messageApi.success('Задача изменена');
      onClose();
    } catch (error) {
      console.error('Ошибка при изменении задачи', error);
    }
  };
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
      title={taskId ? 'Изменить задачу' : 'Создать задачу'}
    >
      {contextHolder}
      {isLoading ? (
        <LoadingComponent />
      ) : taskId && currentTask ? (
        <UpdateTaskForm
          key={`update-form-${taskId}`}
          task={currentTask}
          users={users}
          source={source}
          boards={boards}
          onSubmit={handleUpdate}
          onCancel={onClose}
          isLoading={createTaskPending || updateTaskPending}
        />
      ) : (
        <CreateTaskForm
          key={`create-form-${boardId}`}
          boardId={boardId}
          users={users}
          source={source}
          boards={boards}
          onSubmit={handleCreate}
          onCancel={onClose}
          isLoading={createTaskPending || updateTaskPending}
        />
      )}
    </Modal>
  );
};
