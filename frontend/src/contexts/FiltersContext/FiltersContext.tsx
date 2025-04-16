import { createContext, useContext, useState, ReactNode } from 'react';
import { Task } from '../../api/types/task.type';
import { FiltersContextType, FiltersState } from './types';

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider = ({ children, tasks }: { children: ReactNode; tasks?: Task[] }) => {
  const [filters, setFilters] = useState<FiltersState>({
    searchTerm: '',
    statusFilter: 'all',
    priorityFilter: 'all',
    assigneeFilter: 'all',
    boardFilter: 'all',
  });

  const updateFilter = (filterName: keyof FiltersState, value: string) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      statusFilter: 'all',
      priorityFilter: 'all',
      assigneeFilter: 'all',
      boardFilter: 'all',
    });
  };

  // NOTE: сборная сортировка по всем полям
  const filteredTasks = tasks?.filter((task) => {
    return (
      (task.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(filters.searchTerm.toLowerCase())) &&
      (filters.statusFilter === 'all' || task.status === filters.statusFilter) &&
      (filters.priorityFilter === 'all' || task.priority === filters.priorityFilter) &&
      (filters.assigneeFilter === 'all' ||
        task.assignee.id.toString() === filters.assigneeFilter) &&
      (filters.boardFilter === 'all' || task.boardName === filters.boardFilter)
    );
  });

  return (
    <FiltersContext.Provider value={{ filters, updateFilter, resetFilters, filteredTasks }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
};
