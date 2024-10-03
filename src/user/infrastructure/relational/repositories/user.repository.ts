import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/domain/user';
import { NullableType } from 'src/utils/types/nullable.type';
import { UserMapper } from '../mappers/user.mapper';
import { UserRepository } from '../../user.repository';

@Injectable()
export class UsersRelationalRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async findById(id: number): Promise<NullableType<User>> {
    const entity = await this.usersRepository.findOneBy({ id: id });
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findByUsername(username: string): Promise<NullableType<User>> {
    const entity = await this.usersRepository.findOneBy({ username: username });
    return entity ? UserMapper.toDomain(entity) : null;
  }
}
