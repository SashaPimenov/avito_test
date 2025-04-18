import { useQuery } from '@tanstack/react-query';
import { TaskService } from '../../../api/services/taskService';
import { Task } from '../../../api/types/task.DTO';

export const useTaskById = (id: number, options = {}) => {
  return useQuery<Task>({
    queryKey: ['task', id],
    queryFn: () => TaskService.getTaskById(id),
    enabled: !!id,
    ...options,
  });
};
