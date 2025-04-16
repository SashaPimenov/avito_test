import { useMutation } from '@tanstack/react-query';
import { TaskService } from '../../../api/services/taskService';
import { UpdateTaskDTO } from '../../../api/types/update-task.DTO';

export const useUpdateTask = (options = {}) => {
  return useMutation<{ message: string }, Error, { taskId: number; task: UpdateTaskDTO }>({
    mutationFn: ({ taskId, task }) => TaskService.updateTask(taskId, task),
    onError: (error) => {
      console.error('Error updating task:', error);
    },
    ...options,
  });
};
