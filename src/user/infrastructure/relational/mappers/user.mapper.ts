import { User } from '../../../../user/domain/user';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static toDomain(raw: UserEntity): User {
    const domainEntity = new User();
    domainEntity.id = raw.id;
    domainEntity.username = raw.username;
    domainEntity.password = raw.password;
    return domainEntity;
  }
}
