import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RelationalPersistenceModule } from './infrastructure/relational/relational-persistence.module';

@Module({
  imports: [RelationalPersistenceModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, RelationalPersistenceModule],
})
export class UserModule {}
