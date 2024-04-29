import { Calendar } from 'src/calendar/domain/calendar';
import { Pole } from 'src/pole/domain/pole';
import { Scheduler } from 'src/scheduler/domain/scheduler';

export class Event {
  id: number;
  rule: string;
  calendar: Calendar;
  polesArea?: Pole[] | null;
  polesRoad?: Pole[] | null;
  pole?: Pole | null;
  schedulers: Scheduler[];
}
