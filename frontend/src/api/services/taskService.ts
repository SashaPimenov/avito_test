import { ApiService } from '../apiService';
import { CreateTaskDTO } from '../types/create-task.DTO';
import { Task } from '../types/task.type';
import { UpdateTaskDTO } from '../types/update-task.DTO';

export const TaskService = {
  getAllTasks: () => ApiService.get<Task[]>(`/tasks`),
  getTaskById: (id: number) => ApiService.get<Task>(`/tasks/${id}`),
  createTask: (task: CreateTaskDTO) => ApiService.post<{ message: string }>(`/tasks/create`, task),
  updateTask: (taskId: number, task: UpdateTaskDTO) =>
    ApiService.put<{ message: string }>(`/tasks/update/${taskId}`, task),
  updateTaskStatus: (taskId: number, status: string) =>
    ApiService.put<Task>(`/tasks/updateStatus/${taskId}`, { status }),
};
