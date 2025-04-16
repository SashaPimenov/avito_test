import { useQuery } from '@tanstack/react-query';
import { BoardService } from '../../../api/services/boardService';
import { Task } from '../../../api/types/task.type';

export const useBoardById = (id: number) => {
  return useQuery<Task[]>({
    queryKey: ['board', id],
    queryFn: () => BoardService.getBoardById(id),
    enabled: !!id,
  });
};
