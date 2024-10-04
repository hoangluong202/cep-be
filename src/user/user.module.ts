import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RelationalUserPersistenceModule } from './infrastructure/relational/relational-persistence.module';

@Module({
  imports: [RelationalUserPersistenceModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, RelationalUserPersistenceModule],
})
export class UserModule {}
