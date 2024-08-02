import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './infrastructure/relational/repositories/user.repository';
import { UserEntity } from './infrastructure/relational/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return this.userRepository.findByUsername(username);
  }
}
