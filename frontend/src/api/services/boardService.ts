import { ApiService } from '../apiService';
import { Board } from '../types/board.DTO';
import { Task } from '../types/task.DTO';

export const BoardService = {
  getBoards: () => ApiService.get<Board[]>(`/boards`),
  getBoardById: (id: number) => ApiService.get<Task[]>(`/boards/${id}`),
};
