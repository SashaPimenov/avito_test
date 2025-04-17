import { useQuery } from '@tanstack/react-query';
import { TaskService } from '../../../api/services/taskService';
import { Task } from '../../../api/types/task.DTO';

export const useAllTasks = (options = {}) => {
  return useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: () => TaskService.getAllTasks(),
    enabled: true,
    ...options,
  });
};
