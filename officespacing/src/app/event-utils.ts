import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

// Predefined events that load with the calendar
export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: TODAY_STR
  },
  {
    id: createEventId(),
    title: 'Morning event',
    start: TODAY_STR + 'T09:00:00',
    end: TODAY_STR + 'T11:00:00'
  },
  {
    id: createEventId(),
    title: 'Afternoon event',
    start: TODAY_STR + 'T14:00:00',
    end: TODAY_STR + 'T16:00:00'
  }
];

// Function to create a unique event ID
export function createEventId() {
  return String(eventGuid++);
}
