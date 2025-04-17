import { useQuery } from '@tanstack/react-query';
import { BoardService } from '../../../api/services/boardService';
import { Board } from '../../../api/types/board.DTO';

export const useAllBoards = (options = {}) => {
  return useQuery<Board[]>({
    queryKey: ['boards'],
    queryFn: () => BoardService.getBoards(),
    enabled: true,
    ...options,
  });
};
