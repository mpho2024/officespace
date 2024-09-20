import { Component, signal, ChangeDetectorRef, AfterViewInit, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements AfterViewInit, OnInit {
  calendarVisible = signal(true);
  eventColor = '#0000ff'; // Default color
  showEventForm = false; // Control form visibility
  selectedDateRange!: DateSelectArg; // Save selected date range

  // Form data for new event
  eventFormData = {
    title: '',
    officeName: '',
    attendees: 0,
    color: this.eventColor
  };

  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventContent: this.eventContent.bind(this),
    eventDidMount: this.eventDidMount.bind(this),
    aspectRatio: window.innerWidth < 768 ? 1.0 : 1.35,
  });

  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef, private eventService: EventService) {}

  ngOnInit() {
    // Load events from backend when component initializes
    this.loadEventsFromBackend();
  }

  ngAfterViewInit() {
    const calendarEl = document.querySelector('.fc') as HTMLElement;
    if (calendarEl) {
      calendarEl.style.height = '70vh'; // Set height to 70% of the viewport height
    }
  }

  loadEventsFromBackend() {
    this.eventService.getEvents().subscribe(
      (events: Event[]) => {
        const formattedEvents = events.map(event => ({
          id: event.id.toString(),
          title: event.title,
          start: event.startDate,
          end: event.endDate,
          allDay: event.allDay,
          backgroundColor: event.color,
          extendedProps: {
            officeName: event.officeName,
            attendees: event.attendees
          }
        }));
        this.calendarOptions.mutate((options) => {
          options.initialEvents = formattedEvents;
        });
      },
      error => {
        console.error('Error loading events from backend!', error);
      }
    );
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.mutate((options) => {
      options.weekends = !options.weekends;
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.showEventForm = true; // Show the form
    this.selectedDateRange = selectInfo; // Save selected date range
  }

  cancelEvent() {
    this.showEventForm = false; // Hide the form
  }

  onSubmitEvent() {
    const { title, officeName, attendees, color } = this.eventFormData;
    const calendarApi = this.selectedDateRange.view.calendar;

    calendarApi.unselect(); // Clear date selection

    if (title && officeName && attendees) {
      const newEvent: Event = {
        id: 0, // Backend will assign a real ID
        title,
        startDate: this.selectedDateRange.startStr,
        endDate: this.selectedDateRange.endStr,
        allDay: this.selectedDateRange.allDay,
        officeName,
        attendees,
        color
      };

      // Create the event on the backend
      this.eventService.createEvent(newEvent).subscribe((createdEvent: Event) => {
        calendarApi.addEvent({
          id: createdEvent.id.toString(), // Use the ID from the backend
          title: createdEvent.title,
          start: createdEvent.startDate,
          end: createdEvent.endDate,
          allDay: createdEvent.allDay,
          backgroundColor: createdEvent.color,
          extendedProps: {
            officeName: createdEvent.officeName,
            attendees: createdEvent.attendees
          }
        });
        this.showEventForm = false; // Hide the form after submission
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      const eventId = +clickInfo.event.id;

      // Remove from backend
      this.eventService.deleteEvent(eventId).subscribe(() => {
        clickInfo.event.remove(); // Remove from the calendar
      });
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
  }

  handleColorChange() {
    // Handle color change logic
    console.log('Selected color:', this.eventColor);
  }

  eventContent(arg: any) {
    return {
      html: `
        <b>${arg.timeText}</b>
        <i>${arg.event.title}</i> - <span>${arg.event.extendedProps['officeName']} (${arg.event.extendedProps['attendees']} attendees)</span>
      `
    };
  }

  eventDidMount(info: any) {
    info.el.style.backgroundColor = info.event.backgroundColor;
  }
}
