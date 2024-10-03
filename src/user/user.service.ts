import { Injectable } from '@nestjs/common';
import { UserRepository } from './infrastructure/user.repository';
import { NullableType } from '../utils/types/nullable.type';
import { User } from './domain/user';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository) {}

  findById(id: User['id']): Promise<NullableType<User>> {
    return this.usersRepository.findById(id);
  }

  findByUsername(username: User['username']): Promise<NullableType<User>> {
    return this.usersRepository.findByUsername(username);
  }
}
