export interface Assignee {
  avatarUrl: string;
  email: string;
  fullName: string;
  id: number;
}

export interface Task {
  assignee: Assignee;
  boardName: string;
  description: string;
  id: number;
  priority: string;
  status: string;
  title: string;
}
