import { ApiService } from '../apiService';
import { User } from '../types/user.type';

export const UsersService = {
  getUsers: () => ApiService.get<User[]>(`/users`),
};
