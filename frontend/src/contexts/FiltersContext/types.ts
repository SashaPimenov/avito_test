import { Task } from '../../api/types/task.DTO';

export interface FiltersState {
  searchTerm: string;
  statusFilter: string;
  priorityFilter: string;
  assigneeFilter: string;
  boardFilter: string;
}

export interface FiltersContextType {
  filters: FiltersState;
  updateFilter: (filterName: keyof FiltersState, value: string) => void;
  resetFilters: () => void;
  filteredTasks?: Task[];
}
