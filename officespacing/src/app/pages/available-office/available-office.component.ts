import { Component } from '@angular/core';

@Component({
  selector: 'app-available-office',
  templateUrl: './available-office.component.html',
  styleUrls: ['./available-office.component.scss']
})
export class AvailableOfficeComponent {
  offices: string[] = ['Boardroom', 'Mini office', 'Devs', 'Academia'];
  selectedOffice: string = '';

  onSubmit() {
    console.log('Selected office:', this.selectedOffice);
  }
}
