import { ApiService } from '../apiService';
import { User } from '../types/user.DTO';

export const UsersService = {
  getUsers: () => ApiService.get<User[]>(`/users`),
};
