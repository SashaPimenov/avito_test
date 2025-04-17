import { useQuery } from '@tanstack/react-query';
import { UsersService } from '../../../api/services/userService';
import { User } from '../../../api/types/user.DTO';

export const useAllUsers = (options = {}) => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => UsersService.getUsers(),
    enabled: true,
    ...options,
  });
};
