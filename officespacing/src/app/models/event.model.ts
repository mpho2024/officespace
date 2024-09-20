// src/app/models/event.model.ts
export interface Event {
    id: number; // ID should be a number
    title: string;
    startDate: string; // ISO date string
    endDate: string; // ISO date string
    allDay: boolean;
    officeName: string;
    attendees: number;
    color: string; // Color as a string (hex, rgb, etc.)
  }
  