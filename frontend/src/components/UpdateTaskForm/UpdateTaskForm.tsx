import { Board } from '@api/types/board.type';
import { Task } from '@api/types/task.type';
import { User } from '@api/types/user.type';
import { FormFields } from '@components/FormFields';
import { TaskFormValues, UpdateIssueFormValues } from '@components/TaskForm/types';
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
  onSubmit: (data: UpdateIssueFormValues) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

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
  } = useForm<UpdateIssueFormValues>({
    resolver: yupResolver(updateTaskSchema as yup.ObjectSchema<UpdateIssueFormValues>), // Приведение типа
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
