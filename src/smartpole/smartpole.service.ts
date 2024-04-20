import { Injectable } from '@nestjs/common';
import { SmartpoleRepository } from './infrastructure/relational/repositories/smartpole.repository';

@Injectable()
export class SmartpoleService {
  constructor(private readonly smartpoleRepository: SmartpoleRepository) {}

  findById(id: number) {
    return this.smartpoleRepository.findById(id);
  }

  create(data: any) {
    return this.smartpoleRepository.create(data);
  }
}
