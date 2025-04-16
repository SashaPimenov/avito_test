import { useQuery } from '@tanstack/react-query';
import { TaskService } from '../../../api/services/taskService';
import { Task } from '../../../api/types/task.type';

export const useAllTasks = (options = { enabled: true }) => {
  return useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: () => TaskService.getAllTasks(),
    ...options,
  });
};
