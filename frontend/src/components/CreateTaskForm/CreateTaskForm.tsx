import { Board } from '@api/types/board.type';
import { User } from '@api/types/user.type';
import { FormFields } from '@components/FormFields';
import { CreateIssueFormValues, TaskFormValues } from '@components/TaskForm/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { createTaskSchema } from '@validations/taskFormValidations';
import { Control, useForm } from 'react-hook-form';

interface CreateTaskFormProps {
  boardId?: number;
  users?: User[];
  boards?: Board[];
  source: string;
  onSubmit: (data: CreateIssueFormValues) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

export const CreateTaskForm = ({
  boardId,
  users,
  boards,
  source,
  onSubmit,
  onCancel,
  isLoading,
}: CreateTaskFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateIssueFormValues>({
    resolver: yupResolver(createTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'Medium',
      assigneeId: undefined,
      boardId: boardId || undefined,
    },
  });

  return (
    <FormFields
      control={control as Control<TaskFormValues>}
      errors={errors}
      users={users}
      source={source}
      boards={boards}
      boardId={boardId}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={onCancel}
      isLoading={isLoading}
      isEditMode={false}
    />
  );
};
