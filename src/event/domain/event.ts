import { Calendar } from 'src/calendar/domain/calendar';
import { Pole } from 'src/smartpole/domain/pole';
import { Scheduler } from 'src/scheduler/domain/scheduler';

export class Event {
  id: number;
  rule: string;
  type: string;
  calendar: Calendar;
  poles?: Pole[] | null;
  schedulers: Scheduler[];
}
