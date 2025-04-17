import { Priority } from '../../types/priority.type';
import { Status } from '../../types/status.type';

export type TaskFormValues = {
  title: string;
  description: string;
  priority: Priority;
  status?: Status; // Опционально, так как есть только при обновлении
  assigneeId: number;
  boardId?: number; // Опционально, так как есть только при создании
};

export interface UpdateTaskFormValues extends Omit<TaskFormValues, 'boardId'> {
  status: Status; // Делаем обязательным
}

export interface CreateTaskFormValues extends Omit<TaskFormValues, 'status'> {
  boardId: number; // Делаем обязательным
}

export interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  source: string;
  taskId?: number;
  boardId?: number;
}
