import { useMutation } from '@tanstack/react-query';
import { TaskService } from '../../../api/services/taskService';
import { CreateTaskDTO } from '../../../api/types/create-task.DTO';

export const useCreateTask = (options = {}) => {
  return useMutation<{ message: string }, Error, { task: CreateTaskDTO }>({
    mutationFn: ({ task }) => TaskService.createTask(task),

    onError: (error) => {
      console.error('Error updating task:', error);
    },
    ...options,
  });
};
