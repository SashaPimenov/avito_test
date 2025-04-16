import { useState } from 'react';
import { Task } from '../api/types/task.type';

export const useTaskFilters = (tasks?: Task[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');
  const [boardFilter, setBoardFilter] = useState<string>('all');

  const handleSearch = (value: string) => setSearchTerm(value);
  const handleStatusChange = (value: string) => setStatusFilter(value);
  const handlePriorityChange = (value: string) => setPriorityFilter(value);
  const handleAssigneeChange = (value: string) => setAssigneeFilter(value);
  const handleBoardChange = (value: string) => setBoardFilter(value);

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setAssigneeFilter('all');
    setBoardFilter('all');
  };

  const filteredIssues = tasks
    ?.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((task) => (statusFilter === 'all' ? true : task.status === statusFilter))
    .filter((task) => (priorityFilter === 'all' ? true : task.priority === priorityFilter))
    .filter((task) =>
      assigneeFilter === 'all' ? true : task.assignee.id.toString() === assigneeFilter,
    )
    .filter((task) => (boardFilter === 'all' ? true : task.boardName === boardFilter));

  return {
    searchTerm,
    statusFilter,
    priorityFilter,
    assigneeFilter,
    boardFilter,
    filteredIssues,
    handleSearch,
    handleStatusChange,
    handlePriorityChange,
    handleAssigneeChange,
    handleBoardChange,
    resetFilters,
  };
};
