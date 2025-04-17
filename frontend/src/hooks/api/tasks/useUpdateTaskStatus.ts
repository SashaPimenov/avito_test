import { useMutation } from '@tanstack/react-query';
import { TaskService } from '../../../api/services/taskService';
import { Task } from '../../../api/types/task.DTO';

export const useUpdateTaskStatus = (options = {}) => {
  return useMutation<Task, Error, { taskId: number; status: string }>({
    mutationFn: ({ taskId, status }) => {
      return TaskService.updateTaskStatus(taskId, status);
    },

    onError: (error) => {
      console.error('Error updating task status:', error);
    },
    ...options,
  });
};
