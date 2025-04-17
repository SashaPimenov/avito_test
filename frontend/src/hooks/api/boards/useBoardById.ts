import { useQuery } from '@tanstack/react-query';
import { BoardService } from '../../../api/services/boardService';
import { Task } from '../../../api/types/task.DTO';

export const useBoardById = (id: number, options = {}) => {
  return useQuery<Task[]>({
    queryKey: ['board', id],
    queryFn: () => BoardService.getBoardById(id),
    enabled: !!id,
    ...options,
  });
};
