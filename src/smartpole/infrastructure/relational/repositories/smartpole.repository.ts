import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SmartpoleEntity } from '../entities/smartpole.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SmartpoleRepository {
  constructor(
    @InjectRepository(SmartpoleEntity)
    private readonly smartpoleRepository: Repository<SmartpoleEntity>,
  ) {}

  findById(id: number): Promise<SmartpoleEntity> {
    const smartpole = this.smartpoleRepository.findOneBy({ id: id });
    if (!smartpole) {
      throw new Error('Smartpole not found');
    }
    return smartpole;
  }

  async create(data: any) {
    try {
      const smartpole = this.smartpoleRepository.create(data);
      await this.smartpoleRepository.save(smartpole);
    } catch (error) {
      throw new Error('Smartpole not created');
    }
  }
}
