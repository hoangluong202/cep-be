import { User } from '../../../../users/entities/user.entity';
type JwtPayloadType = Pick<User, 'id'>;
