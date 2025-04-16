import { useMutation } from '@tanstack/react-query';
import { TaskService } from '../../../api/services/taskService';
import { Task } from '../../../api/types/task.type';

export const useUpdateTaskStatus = () => {
  return useMutation<Task, Error, { taskId: string; status: string }>({
    mutationFn: ({ taskId, status }) => {
      return TaskService.updateTaskStatus(taskId, status);
    },

    onError: (error) => {
      console.error('Error updating task status:', error);
    },
  });
};
