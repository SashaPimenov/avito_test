// contexts/TaskFormContext.tsx
import { Board } from '@api/types/board.DTO';
import { Task } from '@api/types/task.DTO';
import { User } from '@api/types/user.DTO';
import { CreateIssueFormValues, UpdateIssueFormValues, TaskFormProps } from '@components/TaskForm/types';
import { useAllBoards } from '@hooks/api/boards';
import { useTaskById, useCreateTask, useUpdateTask } from '@hooks/api/tasks';
import { useAllUsers } from '@hooks/api/users';
import { message } from 'antd';
import { createContext, useContext } from 'react';

type TaskFormContextType = {
  users?: User[];
  boards?: Board[];
  currentTask?: Task;
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  onCreate: (data: CreateIssueFormValues) => Promise<void>;
  onUpdate: (data: UpdateIssueFormValues) => Promise<void>;
  onClose: () => void;
  source: string;
  boardId?: number;
  issueId?: number;
};

const TaskFormContext = createContext<TaskFormContextType | undefined>(undefined);

export const TaskFormProvider: React.FC<TaskFormProps> = ({ 
  children, 
  open, 
  onClose, 
  issueId, 
  onSuccess, 
  source, 
  boardId 
}) => {
  const { data: users, isPending: usersPending } = useAllUsers({ enabled: open });
  const { data: currentTask, isPending: taskPending } = useTaskById(issueId!);
  const { data: boards, isPending: boardsPending } = useAllBoards({ enabled: open });

  const { mutate: createTaskMutation, isPending: createTaskPending } = useCreateTask();
  const { mutate: updateTaskMutation, isPending: updateTaskPending } = useUpdateTask();
  const [messageApi, contextHolder] = message.useMessage();

  const isLoading = usersPending || boardsPending || Boolean(issueId && taskPending);

  const handleCreate = async (data: CreateIssueFormValues) => {
    try {
      await createTaskMutation({
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
      onClose();
    } catch (error) {
      console.error('Ошибка при создании задачи', error);
      messageApi.error('Ошибка при создании задачи');
    }
  };

  const handleUpdate = async (data: UpdateIssueFormValues) => {
    try {
      await updateTaskMutation({
        taskId: issueId!,
        task: data,
      });
      onSuccess?.();
      messageApi.success('Задача изменена');
      onClose();
    } catch (error) {
      console.error('Ошибка при изменении задачи', error);
      messageApi.error('Ошибка при изменении задачи');
    }
  };

  return (
    <TaskFormContext.Provider
      value={{
        users,
        boards,
        currentTask,
        isLoading,
        isCreating: createTaskPending,
        isUpdating: updateTaskPending,
        onCreate: handleCreate,
        onUpdate: handleUpdate,
        onClose,
        source,
        boardId,
        issueId,
      }}
    >
      {contextHolder}
      {children}
    </TaskFormContext.Provider>
  );
};

export const useTaskForm = () => {
  const context = useContext(TaskFormContext);
  if (!context) {
    throw new Error('useTaskForm must be used within a TaskFormProvider');
  }
  return context;
};