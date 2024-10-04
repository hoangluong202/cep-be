import { Injectable } from '@nestjs/common';
import { SmartPoleRepository } from './infrastructure/smartpole.repository';
import { SmartPole } from './domain/smartpole';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class SmartPoleService {
  constructor(private readonly poleRepository: SmartPoleRepository) {}

  findById(id: SmartPole['id']): Promise<NullableType<SmartPole>> {
    return this.poleRepository.findById(id);
  }
}
