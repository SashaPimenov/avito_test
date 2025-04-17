import { ReactNode } from 'react';
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

export interface UpdateIssueFormValues extends Omit<TaskFormValues, 'boardId'> {
  status: Status; // Делаем обязательным
}

export interface CreateIssueFormValues extends Omit<TaskFormValues, 'status'> {
  boardId: number; // Делаем обязательным
}

export interface TaskFormProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  source: string;
  issueId?: number;
  boardId?: number;
}
