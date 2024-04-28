import { Calendar } from 'src/calendar/domain/calendar';
import { CalendarEntity } from '../entities/calendar.entity';

export class CalendarMapper {
  static toDomain(entity: CalendarEntity): Calendar {
    const calendar = new Calendar();
    calendar.id = entity.id;
    calendar.name = entity.name;
    calendar.configLightLevel = entity.configLightLevel;
    return calendar;
  }

  static toEntity(domain: Calendar): CalendarEntity {
    const entity = new CalendarEntity();
    entity.name = domain.name;
    entity.configLightLevel = domain.configLightLevel;
    return entity;
  }
}
