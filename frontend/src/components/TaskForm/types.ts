import { Priority } from '../../types/priority.type';
import { Status } from '../../types/status.type';

export interface CreateIssueFormValues {
  title: string;
  description: string;
  priority: Priority;
  assigneeId: number;
  boardId: number;
}

export interface UpdateIssueFormValues {
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  assigneeId: number;
  boardId: number;
}

export interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  source: string;
  issueId?: number;
  boardId?: number;
}
