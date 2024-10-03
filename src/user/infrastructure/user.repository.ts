import { NullableType } from '../../utils/types/nullable.type';
import { User } from '../domain/user';

export abstract class UserRepository {
  abstract findById(id: User['id']): Promise<NullableType<User>>;
  abstract findByUsername(
    username: User['username'],
  ): Promise<NullableType<User>>;
}
