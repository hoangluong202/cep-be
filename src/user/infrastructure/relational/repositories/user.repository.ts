import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async findById(id: number): Promise<UserEntity> {
    const user = this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ username: username });
  }
}
