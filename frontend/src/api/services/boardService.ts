import { ApiService } from '../apiService';
import { Board } from '../types/board.type';
import { Task } from '../types/task.type';

export const BoardService = {
  getBoards: () => ApiService.get<Board[]>(`/boards`),
  getBoardById: (id: number) => ApiService.get<Task[]>(`/boards/${id}`),
};
