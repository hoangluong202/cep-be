import { Injectable } from '@nestjs/common';
import { UserRepository } from './infrastructure/relational/repositories/user.repository';
import { UserEntity } from './infrastructure/relational/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findById(id);
  }

  async findByUsername(username: string): Promise<UserEntity> {
    return await this.userRepository.findByUsername(username);
  }
}
