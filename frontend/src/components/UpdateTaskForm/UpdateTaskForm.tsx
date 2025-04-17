import { Board } from '@api/types/board.DTO';
import { Task } from '@api/types/task.DTO';
import { User } from '@api/types/user.DTO';
import { FormFields } from '@components/FormFields';
import { TaskFormValues, UpdateTaskFormValues } from '@components/TaskModal/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateTaskSchema } from '@validations/taskFormValidations';
import { Control, useForm } from 'react-hook-form';
import { Priority, Status } from 'src/types';
import * as yup from 'yup';

interface UpdateTaskFormProps {
  task: Task;
  boards?: Board[];
  users?: User[];
  source: string;
  onSubmit: (data: UpdateTaskFormValues) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}
/**
 * Форма изменения новой задачи с валидацией.
 * Интегрируется с react-hook-form и yup для валидации.
 * Передает управление полями в компонент FormFields для единообразия интерфейса.
 */
export const UpdateTaskForm = ({
  task,
  boards,
  users,
  source,
  onSubmit,
  onCancel,
  isLoading,
}: UpdateTaskFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateTaskFormValues>({
    resolver: yupResolver(updateTaskSchema as yup.ObjectSchema<UpdateTaskFormValues>), // Приведение типа
    defaultValues: {
      title: task.title,
      description: task.description,
      priority: task.priority as Priority,
      status: task.status as Status,
      assigneeId: task.assignee?.id,
    },
  });

  return (
    <FormFields
      control={control as Control<TaskFormValues>}
      errors={errors}
      task={task}
      boards={boards}
      users={users}
      source={source}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={onCancel}
      isLoading={isLoading}
      isEditMode={true}
    />
  );
};
