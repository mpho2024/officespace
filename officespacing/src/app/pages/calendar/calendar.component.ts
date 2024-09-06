import { Component, signal, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { createEventId, INITIAL_EVENTS } from 'src/app/event-utils';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements AfterViewInit {
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
    initialEvents: INITIAL_EVENTS,
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

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // Set height dynamically if needed
    const calendarEl = document.querySelector('.fc') as HTMLElement;
    if (calendarEl) {
      calendarEl.style.height = '70vh'; // Set height to 70% of the viewport height
    }
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
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: this.selectedDateRange.startStr,
        end: this.selectedDateRange.endStr,
        allDay: this.selectedDateRange.allDay,
        backgroundColor: color, // Apply the selected color
        extendedProps: {
          officeName,
          attendees
        }
      });
    }

    this.showEventForm = false; // Hide the form after submission
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // Update view
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
